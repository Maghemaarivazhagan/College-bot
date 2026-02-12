# 🎓 Vivekanandha College Chatbot

An intelligent FAQ assistant built with **Flask** and **Gemini LLM**. This bot uses **semantic search** to provide students with accurate information regarding **placements, exams, and college fees**.

---

## 🚀 Installation & Setup

### 1. Project Initialization
Clone the repository and move to the backend directory:

```bash
git clone https://github.com/Maghemaarivazhagan/College-bot.git
cd "College bot/backend"

## 2. Environment Setup

Create a virtual environment and activate it:

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate

**Linux:**
```bash
python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

## 3. Configuration

Create a file named `.env` in the `backend` folder and paste the following content:

```env
GEMINI_API_KEY=your_gemini_api_key
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name


## 4. 🗄️ Database Setup

Run this script in your MySQL terminal to initialize the FAQ database:

```sql
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) -- e.g., placement, exam, fees, general
);

## 5. 🖥️ Running the App

Start the Flask server:

```bash
python app.py


The API will be available at: [http://127.0.0.1:5000/chat](http://127.0.0.1:5000/chat)

## 📡 API Usage

**Endpoint:** `/chat`  
**Method:** `POST`  

**Request Body:**

```json
{
    "message": "When is the semester exam?"
}

{
    "response": "The semester exam is scheduled for next month. Please check your student portal for the exact dates."
}





