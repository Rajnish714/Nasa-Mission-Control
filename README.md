# 🚀 NASA Mission Control  

A futuristic space mission control system where you can **schedule launches, track upcoming missions, and explore past launches**—powered by real-time **SpaceX data**. 🌍🚀  

This project uses **Arwes**, a cyberpunk-style React UI framework, to give it a sleek and sci-fi-inspired look. 🛸💡  

## 🌟 What This Project Does  
🔹 Plan and schedule space missions to habitable planets.  
🔹 Track upcoming launches and review past missions.  
🔹 Fetch real-time launch data from the SpaceX API.  
🔹 Styled with **Arwes** for a high-tech sci-fi feel.  
🔹 Deployed using Docker & AWS EC2 for scalability.  

## 🛠 Tech Stack  

### **Frontend (React.js + Arwes UI)**  
🎨 **React.js** – Interactive UI for mission control.  
🛸 **Arwes** – Sci-fi inspired UI with glowing effects.  
💅 **CSS / Styled Components** – Clean and responsive design.  

### **Backend (Node.js + Express.js)**  
🔗 **Express.js** – Handles API requests and mission scheduling.  
🚀 **MongoDB Atlas** – Stores launch details and mission history.  
📡 **SpaceX API** – Fetches real-time launch data.  

### **Deployment & DevOps**  
🐳 **Docker** – Containerized for smooth deployment.  
☁️ **AWS EC2** – Hosted in the cloud for reliability.  

## 🚀 How to Run This Project  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Rajnish714/nasa-mission-control.git
cd nasa-mission-control

2️⃣ Set Up Your Own MongoDB Atlas
Since this project uses a cloud database, you’ll need to set up MongoDB Atlas:

Sign up for MongoDB Atlas
Create a cluster & get your connection string
In the project root, create a .env file and add:
MONGO_URI=your-mongodb-connection-string
(Make sure not to share this connection string!)

3️⃣ Install Dependencies

npm run install

4️⃣ Start the Project

npm run watch or npm run deploy  # Starts the backend & frontend.

5️⃣ Open in Your Browser
👉 http://localhost:8000

🤝 Want to Contribute?
🚀 You’re more than welcome to contribute! Here’s how you can help:

Fork this repo (Click the "Fork" button at the top).
Create a new branch (git checkout -b my-feature).
Make your awesome changes.
Commit your changes (git commit -m "Added a cool feature").
Push to your fork (git push origin my-feature).
Open a Pull Request (I’ll check it out ASAP 🚀).



