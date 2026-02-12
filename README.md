.

🎓 Vivekanandha College Chatbot
An intelligent FAQ assistant built with Flask and Gemini LLM. This bot uses semantic search to provide students with accurate information regarding placements, exams, and college fees.

🚀 Installation & Setup
1. Project Initialization
Clone the repository and move to the backend directory:

Bash
git clone https://github.com/Maghemaarivazhagan/College-bot.git
cd "College bot/backend"
2. Environment Setup
Create a virtual environment and activate it:

Windows:

Bash
python -m venv venv
venv\Scripts\activate
Linux/Mac:

Bash
python -m venv venv
source venv/bin/activate
3. Install Dependencies
Bash
pip install -r requirements.txt
4. Configuration
Create a .env file in the backend folder:

Code snippet
GEMINI_API_KEY=your_gemini_api_key
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
🗄️ Database Setup
Run this script in your MySQL terminal to initialize the database:

SQL
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) -- e.g., placement, exam, fees, general
);
🖥️ Running the App
Start the server:

Bash
python app.py
Test the Endpoint:

URL: http://127.0.0.1:5000/

Method: POST

Body (JSON):

JSON
{
  "message": "When is the semester exam?"
}
