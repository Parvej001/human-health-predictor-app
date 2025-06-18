# human-health-predictor-app

# 🧠 Disease Prediction Web App

This project is an AI-powered **Disease Prediction System** that predicts potential diseases based on user-input symptoms. It uses a **machine learning model** trained on real health data and provides top-3 predictions with confidence scores.

---

## 🌐 Live Demo

🚀 Try the live app here: https://react-client-frontend.onrender.com

---

## ✨ Features

- ✅ Predict diseases based on symptoms
- 🎯 Top 3 disease predictions with confidence %
- 💬 Real-time backend communication via Flask API
- 📊 Machine Learning model (Random Forest)
- 🎥 Beautiful UI with background video and animations
- 💡 Health tips and awareness banners
- 🔄 Reset & update features

---

## 🛠️ Tools & Technologies Used

### 🤖 Backend (Model Service)
- Python 3
- Flask (REST API)
- Scikit-learn (RandomForestClassifier)
- Pandas, NumPy
- Joblib (Model serialization)

### 🌍 Frontend
- React.js
- Tailwind CSS
- Axios (API calls)
- React-Select (multi-select dropdown)
- Framer Motion (animations)
- React Toastify (notifications)

### ☁️ Deployment
- **Frontend:** Render
- **Backend:** Render (Flask-based AI model service)

## 🧪 Run Locally

> Clone the project and install the dependencies for both frontend and backend.

### 1️⃣ Clone the repository
git clone https://github.com/Parvej001/human-health-predictor-app.git
cd human-health-predictor-app

2️⃣ Backend: Setup & Run (Flask + Model)
🔹 Step 1: Install Python dependencies
bash
Copy code
cd model-service
pip install -r requirements.txt
If requirements.txt not available, install manually:

bash
Copy code
pip install flask flask-cors scikit-learn pandas numpy joblib

🔹 Step 2: Train the model (Optional)
bash
Copy code
python train_model.py
node app.js

🔹 Step 3: Run the Flask API
bash
Copy code
python app.py
Your backend will be live on: http://localhost:5000

3️⃣ Frontend: Setup & Run (React)
bash
Copy code
cd react-frontend
npm install
npm start
The app will open at http://localhost:3000 and communicate with the Flask backend.

.

🔄 Change Backend URL (Local Development)
To connect React frontend to your local backend instead of deployed one:

Open src/components/Prediction.jsx

Replace:

js
Copy code
const res = await axios.get("https://your-deployed-backend.com/symptoms");
with:

js
Copy code
const res = await axios.get("http://localhost:5000/symptoms");
Do the same for the POST /predict endpoint.

📌 Future Improvements
Add symptom search and categories
Show more detailed info about each predicted disease
Add user authentication for saving health history

👨‍💻 Author
Made with 💙 by Parvej Khan
