# Caraoke: Ride, Unite, & Eco-Excite

## Steering Towards a Better Tomorrow With One Carpool at a Time!

### **Together, We're Steering Towards a Greener, Cleaner Planet**

---

## Introduction
Caraoke is an innovative carpooling project designed specifically for students. Our mission is to unite students in their daily commute, making it more fun, eco-friendly, and economical. By sharing rides, students can significantly reduce their carbon footprint, foster a sense of community, and enjoy a more enjoyable and sustainable journey to their educational institutions.

## What Caraoke Does
Caraoke transforms the mundane task of commuting into a vibrant and eco-conscious experience. Our platform allows students to easily find and coordinate carpooling opportunities. With a user-friendly interface, students can set their start and end points, find compatible carpool mates, and even track their journey's carbon emission savings.

### Key Features:
- **Interactive Map:** Utilizing Leaflet API for dynamic map interaction, users can visually select their journey's start and end points.
- **Real-time Route Calculation:** Powered by INRIX APIs, Caraoke offers efficient routing options, ensuring the quickest and most eco-friendly paths.
- **Emission Tracking:** A built-in feature to calculate and display the carbon emissions saved per trip, promoting environmental awareness.
- **Google OAuth:** Secure and straightforward login using Google OAuth, ensuring user authentication with minimal hassle.
- **Session Management:** To maintain a seamless user experience, our system manages user sessions effectively, keeping track of user states and preferences.
- **Responsive Design:** Built using React, Caraoke's front-end is responsive, intuitive, and user-friendly, ensuring a great experience on various devices.

## Technology Stack
Caraoke is built using the robust MERN stack, comprising MongoDB, Express.js, React, and Node.js. This combination of technologies ensures a powerful, scalable, and efficient platform.

### Frontend
- **React:** For building a dynamic and responsive user interface.
- **Leaflet API:** To provide an interactive mapping experience.
- **React Context:** Avoiding prop drilling and ensuring smoother state management across components.

### Backend
- **Node.js and Express.js:** These form the backbone of our server-side operations, handling routes, controllers, and middleware authentication.
- **MongoDB and Mongoose Schemas:** Our chosen database for its flexibility and performance, particularly useful in handling diverse data types and user-generated content.

### Middleware and APIs
- **INRIX APIs:** For accurate and real-time traffic data, routing, and journey time calculations.
- **Middleware Authentication:** Ensures security and privacy of user data.
- **Google OAuth:** For secure and quick user authentication.

## Environmental Impact
One of our project's main goals is to reduce carbon emissions. By promoting carpooling among students, we aim to decrease the number of vehicles on the road, leading to lower carbon footprints and a healthier planet. Our carbon emission calculation feature plays a pivotal role in educating users about the environmental impact of their travel choices.

## Conclusion
Caraoke is more than just a carpooling service; it's a movement towards a more sustainable and connected student community. By leveraging cutting-edge technologies and a user-centric design, we are paving the way for a greener future, one shared ride at a time.

Join us in this journey, and let's make every ride a step towards a cleaner planet!

---

# Backend Setup Instructions

To set up the backend, you need to create a `.env` file in the backend folder with the following variables filled out:

```env
PORT=
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
APPID=
HASHTOKEN=

```

## Now start the frontend and backend

```
npm run dev  # In the backend folder
npm start    # In the frontend folder
```

## FINALLY, GO HAVE FUN!!!
