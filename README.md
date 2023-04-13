# User Authentication API

This project is a Node.js API for user authentication. It uses Express.js as the server framework, bcrypt for password hashing, JSON Web Tokens (JWT) for authentication, and dotenv to load environment variables from a .env file.

## The API has the following endpoints:

GET /users - Returns the list of users in JSON format.
POST /users - Adds a new user to the list of users. Requires an email and password in the request body. The password is hashed before being stored in the user object.
POST /login - Authenticates a user and generates a JWT access token. Requires an email and password in the request body.
GET /posts - Returns the list of to-do items for the authenticated user in JSON format.
POST /todo - Adds a new to-do item to the authenticated user's list. Requires a title and description in the request body.

## Dependencies

express - Server framework for Node.js
bcrypt - Library for password hashing
jsonwebtoken - Library for generating JSON Web Tokens
cors - Middleware for enabling Cross-Origin Resource Sharing
dotenv - Library for loading environment variables from a .env file

## How to run the API

Clone this repository to your local machine.
Open a terminal window and navigate to the project directory.
Run npm install to install the dependencies.
Create a .env file in the root directory and add the following environment variables:
ACCESS_TOKEN_SECRET=your_secret_key_here
Run npm start to start the server.
Start To-do app to interact with the API.
