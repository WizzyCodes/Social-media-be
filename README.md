# Social-media-be

A comprehensive social media backend built with [Node.js/Express] providing features for user authentication, posting, commenting, liking, rating and more.

Features

- User registration and login
- Password hashing and salting

- Post creation, editing, and deletion
- Commenting and liking on posts
- User profile management

API Endpoints

Authentication

- POST /register - Register a new user
- POST /login - Login an existing user
- GET /profile - Get user profile information

Posts

- POST /posts - Create a new post
- GET /posts - Get all posts
- GET /posts/:id - Get a single post
- PUT /posts/:id - Edit a post
- DELETE /posts/:id - Delete a post

Comments

- POST /comments - Create a new comment
- GET /comments - Get all comments
- GET /comments/:id - Get a single comment
- PUT /comments/:id - Edit a comment
- DELETE /comments/:id - Delete a comment

Likes

- POST /likes - Like a post or comment
- DELETE /likes/:id - Unlike a post or comment

Installation

1. Clone the repository: `git clone https://github.com/WizzyCodes/Social-media-be.git
2. Install dependencies: npm install
3. Start the server: npm start
