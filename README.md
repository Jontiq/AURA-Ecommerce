# AURA E-Commerce

A full-stack e-commerce application for a luxury perfume brand. Users can browse and search for fragrances, add products to their cart, manage a favourites list, and place orders. The application supports user authentication with JWT, allowing users to register, log in, and view their order history.

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- React Context for global state (Cart & Auth)
- CSS (Custom, responsive design)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

---

## Project Structure
FULLSTACK-AURAECOMMERCE/
├── Frontend/          # React application
├── Backend/           # Express API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── data/          # Seed script
└── package.json       # Root – runs both servers

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Atlas account and cluster

### Clone the repo
```bash
git clone https://github.com/your-username/your-repo-name.git
cd FULLSTACK-AURAECOMMERCE
```

### Environment Variables

Create a `.env` file in the `Backend/` folder:
PORT=5000
CONNECTION_STRING=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key

Create a `.env` file in the `Frontend/` folder:
VITE_API_URL=http://localhost:5000/api

### Install Dependencies

```bash
# Root
npm install

# Frontend
cd Frontend && npm install

# Backend
cd ../Backend && npm install
```

### Seed the Database

Populate the database with products and a test user:
```bash
cd Backend
npm run seed
```

### Login

A test account is available after seeding:
Username: user
Password: password

### Run the App

From the root folder, start both frontend and backend simultaneously:
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Figma Design
[View Figma Design](https://www.figma.com/design/M04oUQXZcHgrCeg09GLMPb/AURA---DesignSystem?node-id=1-30&p=f)

## GitHub Repository
[View Repository](https://github.com/Jontiq/AURA-Ecommerce.git)

---

## Project Analysis