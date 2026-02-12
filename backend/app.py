from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import numpy as np
import mysql.connector
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# LLM Imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

# ========================
# Initialize Flask & LLM
# ========================
app = Flask(__name__)
CORS(app)

# Load variables from .env
load_dotenv() 
api_key = os.getenv("GEMINI_API_KEY")
print(f"DEBUG: API Key loaded: {api_key[:5]}***")
# Initialize Gemini 1.5 Flash (Faster & Reliable)
llm = ChatGoogleGenerativeAI(
   model="models/gemini-flash-lite-latest",
    google_api_key=api_key,
    temperature=0.5
)





def load_faqs():
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
    cursor = conn.cursor()
    cursor.execute("SELECT question, answer, category FROM faq")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

faq_data = load_faqs()

print("Loading semantic model...")
model = SentenceTransformer("all-MiniLM-L6-v2")
questions = [row[0] for row in faq_data]
embeddings = model.encode(questions, convert_to_numpy=True)
print("Chatbot ready!")

INTENT_CATEGORY_MAP = {
    "placement": ["placement", "placed_students"],
    "exam": ["semester_exam"],
    "fees": ["fees"],
    "general": []
}

def detect_intent(text):
    text = text.lower()
    keywords = {
        "placement": ["placement", "company", "job", "package"],
        "exam": ["exam", "semester", "timetable", "schedule", "test"],
        "fees": ["fee", "fees", "payment"]
    }
    for intent, keys in keywords.items():
        if any(k in text for k in keys):
            return intent
    return "general"

def semantic_search(user_query, intent):
    user_vec = model.encode([user_query], convert_to_numpy=True)
    best_score = 0
    best_answer = None
    allowed_categories = INTENT_CATEGORY_MAP.get(intent, [])

    for i, (q, a, cat) in enumerate(faq_data):
        if intent != "general" and cat not in allowed_categories:
            continue
        score = cosine_similarity(user_vec, embeddings[i].reshape(1, -1))[0][0]
        if score > best_score:
            best_score = score
            best_answer = a
    return best_score, best_answer

def expand_with_llm(user_query, short_answer):
    """Turns the short MySQL answer into a human-like response."""
    template = """
    You are the friendly official assistant for Vivekanandha College. 
    A student asked: "{question}"
    The factual answer from our records is: "{answer}"
    
    Please provide a warm, helpful, and detailed response based ONLY on the factual answer provided. 
    Keep it professional yet encouraging.
    """
    prompt = template.format(question=user_query, answer=short_answer)
    
    try:
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        print(f"LLM Error: {e}")
        return short_answer # Fallback to database answer

def chatbot_response(user_query):
    intent = detect_intent(user_query)
    score, answer = semantic_search(user_query, intent)

    if answer and score > 0.35: # Adjusted threshold for better accuracy
        return expand_with_llm(user_query, answer)

    return "I'm sorry, I couldn't find that in our records. Please visit the college office for details."

# ========================
# Flask Route
# ========================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")
    if not user_message:
        return jsonify({"response": "No message received."}), 400
    
    response_text = chatbot_response(user_message)
    return jsonify({"response": response_text})

if __name__ == "__main__":
    app.run(debug=True, port=5000)