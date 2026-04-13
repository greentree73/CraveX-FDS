🍔 CraveX – Food Delivery System

CraveX is a full-stack food delivery web application that allows users to browse restaurants, explore menus, add items to a cart, and place orders through a modern and intuitive interface.

It is designed to simulate a real-world food ordering experience similar to platforms like Uber Eats, while demonstrating strong full-stack development skills and scalable architecture.

🚀 Features
• 🔐 User Authentication (Login / Signup with JWT)  
• 🍽️ Browse restaurants by category
• 📋 View menu items with images
• 🛒 Add items to cart
• 📦 Place orders
• 📜 View order history
• ⚡ Real-time UI updates with GraphQL
• 🎨 Clean and responsive UI

🏗️ Tech Stack
Frontend
• React (Vite)
• TypeScript
• Apollo Client
• Bootstrap
Backend
• Node.js
• Express
• Apollo Server (GraphQL)
Database
• MongoDB
• Mongoose
Authentication
• JSON Web Tokens (JWT)

⚙️ Architecture
• Frontend communicates with backend using Apollo Client
• Backend exposes a GraphQL API
• MongoDB stores application data
• JWT handles authentication and authorization

📂 Project Structure
client/
src/
apollo/
components/
pages/
graphql/
types/
utils/
public/
images/

server/
src/
models/
schema/
resolvers
typeDefs
services/
seeds/

🧑‍💻 Installation & Setup

1. Clone the repository
   git clone https://github.com/greentree73/cravex-fds.git

2. Setup Backend
   cd server
   npm install

Create .env file:

PORT=4000
MONGO_URI=mongodb://localhost:27017/cravex
JWT_SECRET=your_secret_key

Run backend:
npm run build
npm start

3. Setup Frontend
   cd client
   npm install
   npm run dev

4. Run both frontend and backend concurrently

go to the root of project
npm install
npm run develop

🌐 Application URLs
• Frontend: http://localhost:5173
• Backend (GraphQL): http://localhost:4000/graphql

🎯 Usage

1. Sign up or log in
2. Browse restaurants
3. Select a restaurant
4. View menu items
5. Add items to cart
6. Place an order
7. View order history

⚠️ Challenges Faced
• Designing GraphQL schema and relationships
• Implementing JWT authentication with GraphQL context
• Handling TypeScript type issues across frontend/backend
• Managing Apollo Client integration
• Mapping dynamic images for UI

🏆 Key Achievements
• Built a complete end-to-end ordering system
• Implemented scalable GraphQL architecture
• Created reusable UI components
• Delivered a clean and intuitive user experience

🔮 Future Enhancements
• 💳 Payment integration (Stripe)
• 📍 Real-time order tracking
• ⭐ Ratings and reviews
• 🧑‍💼 Admin dashboard
• 📱 Mobile responsiveness improvements
• 🤖 AI-based recommendations

🔗 Links
• 🌐 Deployed App: https://cravex-fds.onrender.com/
• 💻 GitHub Repo: https://github.com/greentree73/CraveX-FDS

👤 Author
Vandana Arora

⭐ Acknowledgements
• Inspired by Uber Eats & DoorDash
• Built as part of a full-stack development project
