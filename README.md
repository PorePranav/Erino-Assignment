# Erino Assignment - Project Setup & Documentation

## Setup Instructions for Running the Project

### 1. Clone the Repository
First, clone the project repository to your local machine:

```bash
git clone https://github.com/PorePranav/Erino-Assignment
cd Erino-Assignment
```

### 2. Install Dependencies
Navigate to the root directory and install the dependencies for both the client and server:

```bash
cd client
npm install
```

```bash
cd ../server
npm install
```

### 3. Set Up Environment Variables
- Check your email for the `server.env` and `client.env` files provided.
- Place the files in the respective directories:
  - Copy `server.env` to the `server` directory and rename it to `.env`
  - Copy `client.env` to the `client` directory and rename it to `.env`

### 4. Start the Development Servers
Start both the server and client development servers:

```bash
npm run dev
```

```bash
cd ../client
npm run dev
```

- This command will launch both:
  - **Backend server** (API): Runs on `http://localhost:3000`
  - **Frontend client** (React app): Runs on `http://localhost:5173`

### 5. Access the Application
Open your browser and navigate to:

```plaintext
http://localhost:5173
```

## Troubleshooting
- Ensure Node.js (v14 or above) and npm are installed.
- Verify MongoDB is running or accessible via the provided URI.
- If ports 3000 or 5173 are in use, update the `.env` files and the code to use different ports.

# Frontend Documentation

## State Management
### TanStack Query (formerly React Query)
**Why TanStack Query?**
- Makes handling server state easier
- Built-in caching that reduces unnecessary API calls
- Automatic background data updates
- Simple loading and error states management
- Easy data mutations (create, update, delete)
- Works great with REST APIs

## Key Features
- User authentication (login/signup)
- Contact management (CRUD operations)
- Form validation
- Toast notifications
- Protected routes

## API Endpoints Overview
### Authentication Routes (`/api/v1/auth`)
- `POST /signup` - Register a new user
- `POST /login` - Authenticate a user
- `GET /logout` - Log out current user
- `GET /me` - Get current user's profile

### Contact Routes (`/api/v1/contacts`)
All contact routes require authentication:
- `POST /` - Create a new contact
- `GET /` - Get all contacts for logged-in user
- `PUT /:id` - Update a specific contact
- `DELETE /:id` - Delete a specific contact

### Choice of Database: MongoDB
#### **Why MongoDB?**
1. **Document-Oriented Structure**: MongoDB stores data in JSON-like documents, making it a perfect fit for applications like a contact manager, where the structure of `User` and `Contact` data is naturally hierarchical and flexible.
2. **Schema Flexibility**: If any changes to the schema are required at later stages, MongoDB allows adding or modifying fields without disrupting the existing data, making it highly adaptable.
3. **Ease of Integration with JavaScript**: MongoDB works seamlessly with Node.js and Express, making it easier to implement CRUD operations using popular libraries like Mongoose.

# Challenges Faced
During this assignment, I faced a challenge because I didn't have much experience with Material UI. I had to check its documentation and examples to understand how to use its components effectively. I referred to the docs and examples for guidance and then wrote the code based on what I learned. It took some time to get used to the syntax and structure, but I was able to implement the necessary UI components for the contact manager app with a better understanding of Material UI.