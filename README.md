# SpaceX Clone Backend API

## Project Overview

This project is a SpaceX Clone Backend API developed using Node.js, Express.js, and MongoDB following the MVC architecture. It provides RESTful APIs for managing Rockets, Missions, Launches, and Capsules with JWT-based authentication.

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Rocket CRUD Operations
- Mission CRUD Operations
- Launch CRUD Operations
- Capsule CRUD Operations
- Search Functionality
- Filtering
- Pagination
- MongoDB Database Integration
- MVC Architecture

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv

## Project Structure

```
config/
controller/
middleware/
models/
routes/
uploads/

index.js
package.json
```

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | /v1/register |
| POST | /v1/login |
| GET | /v1/profile |

### Rockets

| Method | Endpoint |
|--------|----------|
| POST | /v1/rockets |
| GET | /v1/rockets |
| GET | /v1/rockets/:id |
| PUT | /v1/rockets/:id |
| DELETE | /v1/rockets/:id |

### Missions

| Method | Endpoint |
|--------|----------|
| POST | /v1/missions |
| GET | /v1/missions |
| GET | /v1/missions/:id |
| PUT | /v1/missions/:id |
| DELETE | /v1/missions/:id |

### Launches

| Method | Endpoint |
|--------|----------|
| POST | /v1/launches |
| GET | /v1/launches |
| GET | /v1/launches/:id |
| PUT | /v1/launches/:id |
| DELETE | /v1/launches/:id |

### Capsules

| Method | Endpoint |
|--------|----------|
| POST | /v1/capsules |
| GET | /v1/capsules |
| GET | /v1/capsules/:id |
| PUT | /v1/capsules/:id |
| DELETE | /v1/capsules/:id |

## Installation

1. Clone the repository

```
git clone <repository-url>
```

2. Install dependencies

```
npm install
```

3. Create a `.env` file and add:

```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the server

```
npm run dev
```

## Author

Madhumitha