# TodoApp

A full-stack Todo application built with Node.js, Express, and React.js.

## Features

- ✅ Add new todos
- ✅ Mark todos as completed
- ✅ Delete todos
- ✅ View todo statistics
- ✅ Responsive design
- ✅ RESTful API backend

## Tech Stack

### Backend
- Node.js
- Express.js
- CORS
- Body-parser

### Frontend
- React.js
- Axios
- CSS3

## Project Structure

```
TodoApp/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── AddTodo.js
│   │   │   ├── TodoItem.js
│   │   │   └── TodoList.js
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   ├── public/
│   └── package.json       # Frontend dependencies
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### Setup Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### GET /api/todos
Get all todos

### GET /api/todos/:id
Get a specific todo by ID

### POST /api/todos
Create a new todo
```json
{
  "text": "Todo text"
}
```

### PUT /api/todos/:id
Update a todo
```json
{
  "text": "Updated text",
  "completed": true
}
```

### DELETE /api/todos/:id
Delete a todo

## Usage

1. Start the backend server (port 5000)
2. Start the frontend development server (port 3000)
3. Open your browser and navigate to `http://localhost:3000`
4. Add, complete, and delete todos as needed

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # React development server with hot reload
```

## License

This is a personal project for learning purposes.
