# Express MVC CRUD API with MongoDB Atlas

An Express.js server using MVC architecture, Mongoose, and MongoDB Atlas for user CRUD operations.

## Project Structure

```text
express-server/
  server.js
  src/
    app.js
    config/
      db.js
    controllers/
      userController.js
    middleware/
      errorHandler.js
      notFound.js
      requestLogger.js
    models/
      userModel.js
    routes/
      userRoutes.js
```

## Setup

```bash
npm install
```

Create a `.env` file from `.env.example`, then replace the placeholder `MONGO_URI` with your MongoDB Atlas connection string.

```env
PORT=3000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/express_mvc_crud?retryWrites=true&w=majority
```

If Node shows a `querySrv ECONNREFUSED` error for a `mongodb+srv://` URI, use the standard multi-host `mongodb://` URI format shown in `.env.example`.

Start the server:

```bash
npm start
```

The server runs at `http://localhost:3000`.

## MongoDB Atlas Checklist

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add your current IP address in Atlas Network Access.
4. Copy the Node.js driver connection string.
5. Paste it into `.env` as `MONGO_URI`.
6. Keep `.env` private. It is already ignored by Git.

## API Routes

### API Info

```bash
curl http://localhost:3000/
```

### Get All Users

```bash
curl http://localhost:3000/api/users
```

Optional query filters:

```bash
curl "http://localhost:3000/api/users?role=user&name=priya"
```

### Get User By ID

```bash
curl http://localhost:3000/api/users/1
```

### Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Neha Singh\",\"email\":\"neha.singh@example.com\",\"role\":\"user\"}"
```

### Replace User

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Mohit Sharma\",\"email\":\"mohit.updated@example.com\",\"role\":\"admin\"}"
```

### Update User

```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d "{\"role\":\"user\"}"
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## MVC Responsibilities

- **Model**: `src/models/userModel.js` stores and changes user data.
- **Config**: `src/config/db.js` connects the app to MongoDB Atlas.
- **Controller**: `src/controllers/userController.js` handles request logic and responses.
- **Routes**: `src/routes/userRoutes.js` maps HTTP methods and URLs to controller actions.
- **Middleware**: `src/middleware/` contains request logging, 404 handling, and error handling.
