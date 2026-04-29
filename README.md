# csc337_finalProject



## Project Modules
This project consists of three interconnected modules.A module is a part of the project that has its own database document (MongoDB collection)
1. **User Module**: Handles user registration, authentication (login, logout, etc.), and session management.
2. **Product Module (Shirts)**: Manages the inventory database and displays the catalog to users.
3. **Order Module**: Manages the shopping cart and stores finalized transaction data.

## Setup and Installation
Follow the steps below to install dependencies and run the project.

### 1. Install required packages 
Run the following command in your terminal to install Express and other necessary database/session packages:
```
npm install express mongodb dotenv express-session
```

### 2. Configure Environment Variables
* Create a file named `.env` in the root directory.
* Copy the contents of `.env.example` into `.env`.
* Update the `MONGO_URI` with the group's MongoDB Atlas connection string.

### 3. Start the server 
Run the following command to start the Node server:
```
node server.js
```

### 4. Access the application
The application will run at http://localhost:8080

