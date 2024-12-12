# Connect Hub

**Connect Hub** is a portal designed to connect caretakers and caregivers, making it easier for caretakers to find and book caregivers in their local area. The platform allows caretakers to:

- Browse available caregivers
- View caregiver profiles
- Schedule appointments based on caregiver availability

On the other side, caregivers can:

- View and manage appointments
- Provide timely and efficient in-home care services

The platform streamlines the process of finding care services, enabling users to connect quickly and conveniently.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- Easy browsing of caregiver profiles for caretakers.
- Caregivers can manage their availability and appointments.
- Quick and convenient connection between users.
- MongoDB-backed data storage for dynamic content.

## Installation

This repository contains separate directories for the frontend and backend. To run the application locally, you need to run both in separate terminal instances.

**Prerequisites:**

- Ensure you have [Node.js](https://nodejs.org/) installed.
- You need a MongoDB connection string (can be obtained from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

### Backend Setup

1. From the root folder, open a terminal and navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install all backend dependencies:

   ```bash
   npm install
   ```

3. **(Optional) First-Time Setup:**

   - In your editor, open `backend/server.js` and replace the connection string on line 24 with your MongoDB connection string.
   - Open `backend/seeders/seedHomeContent.js` and replace the MongoDB connection string on line 4 with your own.

   To populate the database with initial content for the home page and other pages, run the following command in your terminal:

   ```bash
   node seeders/seedHomeContent.js && node seeders/eventsSeeder.js
   ```
 do the same for the other seeder files
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install all frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```

Once both frontend and backend servers are running, you can access the application in your browser.

## Technologies Used

- **Frontend:**
  - React
  - CSS/SCSS
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

Thank you!  
**Connect Hub Team**
