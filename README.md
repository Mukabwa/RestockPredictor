SmartRestock - ML-Powered Inventory Demand Predictor

SmartRestock is a machine learning-based web application designed to help small businesses forecast product demand and make smarter restocking decisions. It combines historical sales data analysis, a trained regression model, and a user-friendly React frontend.

 Features

Forecast demand for "Food and beverages" using past sales trends

Accepts Day of Week, Previous Day Sales, and 3-Day Average

Predicts recommended quantity for restocking

Backend built with Flask

Frontend built with React

Project Structure

restock-predictor/
├── backend/
│   ├── app.py                  # Flask API serving the ML model
│   ├── food_demand_model.pkl  # Trained Random Forest model
│
├── frontend/
│   ├── src/App.js             # Main React component
│   └── ...                    # Other React boilerplate

How to Run the Project

1. Backend (Flask)

cd backend
pip install flask flask-cors joblib
python app.py

2. Frontend (React)

cd frontend
npm install
npm start

Ensure the Flask API is running on port 5000 before launching the React app on port 3000.

🛠 Technologies Used

Python

Pandas, NumPy, scikit-learn, Joblib

Flask + Flask-CORS

React (Create React App)

📈 Model Overview

Model: Random Forest Regressor

Inputs:

Day of Week (0 = Monday, 6 = Sunday)

Previous Day's Sales

3-Day Rolling Average Sales

Output:

Predicted quantity to restock
