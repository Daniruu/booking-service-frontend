# BookItEasy - Frontend

### Project Description

BookItEasy is a frontend application built with React that provides a user interface for the service booking platform. Users can browse available services, book them for specific dates and times, as well as create business accounts and manage their profiles and services.

This frontend interacts with the BookItEasy backend, which handles authentication, service management, and booking via a RESTful API.

### System Requirements
- Node.js (version 16.0 or higher)
- npm (Node.js package manager)

### Setup Instructions
1. **Clone the repository:**
```bash
  git clone https://github.com/Daniruu/booking-service-frontend.git
  cd booking-service-frontend
```
2. **Install dependencies:** After cloning the repository, install all the necessary dependencies by running:
```bash
  npm install
```
3. **Configure environment variables:**
Create a .env file in the root of the project and add the following configuration:
```bash
REACT_APP_API_URL=http://localhost:5022
```
4. **Running the application:** You can start the development server by running the following command:
```bash
  npm start
```
This will run the application locally at:
- http://localhost:3000

### API Communication

The frontend communicates with the backend API for user authentication, booking management, and service retrieval. Ensure that the backend server is running and accessible at the URL specified in the .env file.

### Technologies
- React
- React Router
- Material-UI
- Fetch (for API requests)
- Google Cloud Storage
- Day.js

### Authentication

The application uses JWT for authentication. After logging in, the user's JWT is stored in local storage, and it is included in the Authorization header of API requests to protected routes.

