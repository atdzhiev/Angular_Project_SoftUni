# 🎉 EventsApp 
A single‑page application (SPA) for browsing, creating, and managing events.

## 📖 Overview  
EventsApp allows users to explore events, join them, and create their own.  
The app is built with **Angular** (frontend) and SoftUni Rest API (backend).

---

## 👥 Roles  
### **Guests**
- Browse Home, Events, Event Details, Contact  
- Register / Login  

### **Users**
- Create events  
- Edit/delete their own events  
- Join/leave events  
- View profile with their created and joined events

---

## 🌐 Public Pages  
- **Home** → Intro + latest events  
- **Events Catalog** → List of all events  
- **Event Details** → Full event information  
- **Contact** → Static contact page  
- **Login / Register** → Authentication pages  

---

## 🔒 Private Pages (Logged‑in Users)  
- **Profile** → User info with created and joined events  
- **Create Event** → Add a new event  
- **Edit/Delete Event** → Modify or delete an event you created  
- **Join / Leave Event** → Available on event details  

---

## 🔑 Core Features  
- **JWT Authentication** with automatic token injection via Angular interceptor  
- **Protected Routes** using `authGuard` (`/profile`, `/create`, `/edit/:id`)  and `guestGuard` (`/login`, `/register`)
- **Event CRUD** (create, read, update, delete)  
- **Join/Leave System** for event participation  
- **LocalStorage Persistence** for user session  
- **Angular Components** and **Signals** for state

---

## ▶️ Running the App  
### **Client**
`npm install`  
`ng serve`

### **Server**
`npm install`  
`npm start`

---

## Deployment  
Both the **frontend** and **backend** are deployed on **Render**.



