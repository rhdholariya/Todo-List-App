# Simple Todo List Application

## Overview

This project is a simple Todo List application built using:

- **Node.js** for the backend
- **React.js** for the frontend
- **MongoDB** as the database

The project is containerized using Docker for both the backend and frontend, with MongoDB also running in a Docker container.

## Project Structure


## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Configuration

### 1. Configure MongoDB

Update the MongoDB connection string in the `.env` file located in the `backend` directory with your MongoDB Atlas credentials:

```
BASE_URL='mongodb://root:password@mongo:27017/todo'
```

### 2. Build the FrontEnd

```
cd ../frontEnd
npm run build
```

### 3. Build and Start Containers

```
1. Navigate to the Root Directory:
   Ex. cd /path/to/your/project

2. Build and Start Containers:
    docker-compose up --build
```
### 4. Running FrontEnd
    
Open http://localhost:3000 
