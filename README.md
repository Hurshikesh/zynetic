Product Management Web App
A full-stack web application for managing products, built with React (TypeScript) on the frontend and Node.js + Express + MongoDB on the backend.

📦 Tech Stack
Frontend: React + TypeScript + bootstrap

Backend: Node.js + Express + TypeScript + MongoDB

Auth: JWT-based authentication

📁 Project Setup
1. Clone the Repository
git clone https://github.com/Hurshikesh/zynetic.git
cd zynetic

2. Frontend Setup

cd frontend
npm i
npm run dev
Frontend will run at: http://localhost:5173

4. Backend Setup
cd backend
✅ Create a .env file and add your MongoDB connection URL:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Then build and start the server:

npx tsc
node dist/server.js
Backend will run at: http://localhost:5000

✅ Features
User signup/login with JWT

Add, update, delete, and list products

Filter, sort, search


Protected routes

