# Express API Server Demo

A simple Express web server demonstrating the use of path parameters, query parameters, request body parsing, built-in, third-party, and custom logging middleware.

## Features

1. **Middlewares**:
   - **Inbuilt**: `express.json()` to parse JSON payloads.
   - **Third-party**: `morgan` HTTP request logger.
   - **Custom**: Request logger middleware printing URL, Method, Timestamp, and IP.

2. **Routes**:
   - `GET /`: API welcome and endpoint overview.
   - `GET /users/:id`: Path parameters to retrieve a single user.
   - `GET /search`: Query parameters to filter users.
   - `POST /users`: Request body payload to add a new user.

---

## Setup & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

---

## API Documentation & Examples

### Custom Middleware Logging Output
Every request will log information to the console in the following format:
```text
[2026-06-30T15:10:00.000Z] GET /users/1 - Client IP: ::1
```

### 1. Root Endpoint (GET `/`)
Retrieves API documentation.
- **Request**:
  ```bash
  curl http://localhost:3000/
  ```
- **Response**:
  ```json
  {
    "message": "Welcome to the Express Demo API!",
    "documentation": { ... }
  }
  ```

### 2. Get User by ID (GET `/users/:id`)
Demonstrates **Path Parameters**.
- **Request**:
  ```bash
  curl http://localhost:3000/users/2
  ```
- **Response**:
  ```json
  {
    "message": "User retrieved successfully",
    "data": {
      "id": 2,
      "name": "Mohit Sharma",
      "email": "mohit.sharma@example.com",
      "role": "user"
    }
  }
  ```

### 3. Search Users (GET `/search`)
Demonstrates **Query Parameters**.
- **Request**:
  ```bash
  curl "http://localhost:3000/search?role=user&name=mohit"
  ```
- **Response**:
  ```json
  {
    "queryReceived": {
      "role": "user",
      "name": "mohit"
    },
    "count": 2,
    "data": [
      {
        "id": 2,
        "name": "Mohit Sharma",
        "email": "mohit.sharma@example.com",
        "role": "user"
      },
      {
        "id": 3,
        "name": "Mohit Sharma",
        "email": "mohit.sharma@example.com",
        "role": "user"
      }
    ]
  }
  ```

### 4. Create User (POST `/users`)
Demonstrates **Request Body**.
- **Request**:
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name": "Mohit Sharma", "email": "mohit.sharma@example.com", "role": "admin"}' \
    http://localhost:3000/users
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "data": {
      "id": 4,
      "name": "Mohit Sharma",
      "email": "mohit.sharma@example.com",
      "role": "admin"
    }
  }
  ```
