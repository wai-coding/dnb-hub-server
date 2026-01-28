# DNB Hub – Server (Backend)

This repository contains the **backend REST API** for the DNB Hub application.  
It is built with **Node.js, Express and MongoDB**, and provides authentication with JWT as well as CRUD endpoints for the main entities.

This project was developed as part of **Module 3** to practice full-stack development with the MERN stack.

---

## Features

### Authentication

- User signup and login with JWT authentication
- Token verification middleware
- Protected routes
- Profile update endpoint (username and profile picture)

### API Functionality

- CRUD operations for:
  - Artists
  - Events
  - Promoters
- Relationships between models:
  - An event belongs to a promoter
  - An event can include multiple artists
- Input sanitization to avoid saving empty fields

---

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

---

## Models & Relationships

### Models

- User
- Artist
- Event
- Promoter

### Relationships

- Event → Promoter (one-to-many)
- Event → Artists (many-to-many)

---

## API Routes (Overview)

### Auth

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/verify`
- `PUT /auth/profile`

### Artists

- `/artists`

### Events

- `/events`

### Promoters

- `/promoters`

---

## MVP Scope

- JWT authentication
- CRUD for main entities
- Relationships between models
- Secure and structured REST API

---

## Future Improvements

- Image upload using cloud storage instead of image URLs
- Role-based access control
- Integration with maps to display event locations

---

## Author

Developed by **Luís Castro** as part of the Module 3 project.
