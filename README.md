# Kanban Board

A simple and interactive responsive Kanban board built using Angular, Angular Material, and CDK Drag and Drop functionality.

## Deployed Project Link:
https://taskmanageappl.netlify.app/

## 🚀 Features
- Add, edit, and delete tasks
- Categorize tasks into **To-do, In Progress, and Done**
- Drag-and-drop functionality for easy task management
- Task persistence via a backend API
- Confirmation dialogs for task deletion using SweetAlert2

## 🛠️ Tech Stack
- **Frontend:** Angular, Angular Material, CDK Drag and Drop
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **UI Enhancements:** SweetAlert2 for alerts and confirmations

## 📌 Setup & Installation

### 1️⃣ Clone the repository
git clone https://github.com/Parthjain1382/Kanban-Board.git
cd Kanban-Board

2️⃣ Install dependencies for frontend
cd 01_frontend/TaskApplication
npm install

3️⃣ Start the Frontend server
cd 01_frontend/TaskApplication
ng serve
Visit http://localhost:4200/ in your browser.

📡 Backend Setup
Ensure the backend API is running for full functionality:

Navigate to the backend folder:
cd 02_backend

Install backend dependencies:
npm install

Start the backend server:
node index.js
By default, the backend runs on http://localhost:3000/.

📌 Assumptions
-The application assumes that Angular CDK Drag and Drop is used for implementing task movement between columns.
-MongoDB is used as the database for storing tasks.
-The user interface is designed with Angular Material for better usability and responsiveness.
-SweetAlert2 is used for confirmation dialogs before deleting tasks.

📌 Approach

Kanban Board Implementation:
-Tasks are stored in an object containing arrays for todo, inProgress, and done statuses.
-Drag-and-drop functionality is implemented using Angular CDK, allowing smooth movement of tasks across categories.
-When a task is moved, its status is updated accordingly in the backend.

Form Handling:
-The task creation/editing form uses Angular Reactive Forms.
-A FormArray is used for managing subtasks dynamically.
-Validation is implemented to ensure proper data input.

📌 Drag-and-Drop Functionality
-Implemented using Angular CDK Drag and Drop.
-Users can drag tasks between different categories (To-do, In Progress, Done), and the backend is updated accordingly.

🎯 API Endpoints
-GET /tasks - Fetch all tasks
-POST /tasks - Add a new task
-PUT /tasks/:id - Update a task
-DELETE /tasks/:id - Delete a task

📷 Screenshots
![image](https://github.com/user-attachments/assets/0d5f8f5b-f5b3-4318-8b46-f1a17533b6dc)
![image](https://github.com/user-attachments/assets/c878d302-79f6-4075-8378-7e57f98332eb)


💡 Future Enhancements
-User authentication & authorization
-Task prioritization & due dates
-Notifications & reminders
