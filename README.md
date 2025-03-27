### **Detailed Description of the Project**  
# 🚀 **S8 Project Work II – Consumable Details Management Portal**  

The **Consumable Details Management Portal** is a full-stack web-based application designed to automate and streamline the management of consumable resources such as office supplies, laboratory materials, and other essential consumables within an organization. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), the project provides efficient inventory tracking, request handling, and approval workflows with real-time stock management, ensuring a secure and scalable solution.

---

## 🔎 **Project Overview**  
### ✅ **Purpose**  
The project addresses inefficiencies in traditional manual inventory systems, such as paper-based or Excel-driven methods, which lead to stock mismanagement, delayed approvals, and limited visibility into resource levels.  
👉 The centralized portal delivers **real-time inventory visibility**, **automated request handling**, and **streamlined approval workflows**, offering a seamless experience for users and administrators alike.

---

## 🎯 **Aim & Objectives**  
### **Aim:**  
To develop an efficient and secure consumable management portal that automates the tracking, requesting, and approval of consumables in an organization.

### **Objectives:**  
✅ **Automate Request and Approval Process:** Minimize human error and accelerate processing times.  
✅ **Real-time Stock Visibility:** Provide up-to-date tracking of stock levels and order statuses.  
✅ **Precise Inventory Management:** Handle stock adjustments based on approvals, rejections, and returns.  
✅ **Secure Access:** Implement role-based access control to safeguard sensitive data.  
✅ **Enhanced User Experience:** Deliver an intuitive, responsive interface for both users and admins.  

---

## 🚨 **Problem Statement**  
> Many organizations still rely on manual tracking and paper-based systems to manage consumable resources, resulting in:  

❌ Stock discrepancies due to outdated records.  
❌ Delayed approvals and order processing.  
❌ Resource wastage and mismanagement.  
❌ Inadequate tracking of returnable and consumable items.  
❌ Lack of centralized control and real-time analytics.  

---

## 🏆 **Proposed Solution**  
The **Consumable Details Management Portal** offers a centralized, automated solution:  
✅ A **User Dashboard** enables users to request materials, track statuses, and view stock availability in real time.  
✅ An **Admin Dashboard** empowers administrators to approve/reject requests, manage stock, and access analytics.  
✅ The system automates request processing, order status updates, and stock adjustments seamlessly.  
✅ Secure login and authentication using JWT ensure data protection and role-specific access.  

---

## 🏗️ **System Architecture**  
The project follows a **client-server architecture** with the following components:  

### 🌐 **Frontend** (React.js)  
- **Framework:** React.js  
- **State Management:** React Hooks (useState, useEffect)  
- **Routing:** React Router  
- **API Handling:** Axios  
- **UI Styling:** Custom CSS with gradients and animations (updated from Tailwind CSS/Material UI)  
- **Charts:** Recharts (for dynamic analytics)  

### 🖥️ **Backend** (Node.js + Express.js)  
- **Framework:** Node.js + Express.js  
- **Database:** MongoDB (NoSQL)  
- **Data Handling:** Mongoose  
- **Encryption:** Bcrypt.js for password hashing  
- **API Security:** JWT for authentication, role-based middleware  

### 🔐 **Security**  
- Role-based access control (Admin/User) via `adminMiddleware.js`.  
- Secure authentication with JWT stored in local storage.  
- Input validation and encrypted data handling using bcrypt in `authController.js`.  

---

## 📋 **Key Features**  

### **1. User Dashboard**  
✅ User Login and Registration with JWT authentication (`Login.jsx`, `Register.jsx`).  
✅ View available stock with real-time updates (`UserDashboard.jsx`).  
✅ Submit requests for consumables with validation (e.g., quantity vs. stock) (`RequestForm.jsx`).  
✅ Track request status (Pending → Approved/Rejected → Shipped/Delivered) (`OrderTracking.jsx`).  
✅ Return returnable items, triggering automatic stock updates.  

---

### **2. Admin Dashboard**  
✅ Approve or reject user requests with stock adjustments (`RequestList.jsx`).  
✅ Manage stock levels (add, update, delete products) (`ManageInventory.jsx`).  
✅ Manage user roles and profiles (`UserManagement.jsx`).  
✅ View real-time analytics via Recharts (`AdminDashboard.jsx`).  
✅ Track order history and stock changes dynamically.  

---

### **3. Request Management**  
✅ Create requests from the user dashboard with purpose and date details.  
✅ Update status based on admin actions (Pending → Approved/Rejected).  
✅ Automatically adjust stock levels in `requestController.js`.  
✅ Handle returnable items with `isReturned` status updates.  

---

### **4. Stock Management**  
✅ Real-time stock visibility with dynamic updates in `UserDashboard.jsx`.  
✅ Stock reduction upon request approval in `requestController.js`.  
✅ Stock increase upon rejection or return of items.  
✅ Planned reorder alerts when stock levels drop (pending implementation).  

---

### **5. Reports and Analytics**  
✅ Real-time stock usage visuals via Recharts in dashboards.  
✅ User request status tracking (`OrderTracking.jsx`).  
✅ Stock consumption insights (partially implemented, pending full reports).  
✅ Returnable vs. non-returnable item tracking in `Request.js`.  

---

### **6. Notifications**  
✅ Planned email notifications for approval/rejection updates (pending).  
✅ Planned low-stock alerts for admins (pending).  

---

## 🛠️ **Database Design**  
### **1. User Schema** (`User.js`)  
| Field        | Type    | Description             |  
|--------------|---------|-------------------------|  
| `name`       | String  | User's name             |  
| `email`      | String  | User's email for login  |  
| `password`   | String  | Encrypted password      |  
| `role`       | String  | User or Admin           |  
| `phone`      | String  | Contact number          |  
| `address`    | String  | User's address          |  
| `department` | String  | Department of user      |  
| `image`      | String  | Profile image URL       |  

---

### **2. Product Schema** (`Product.js`)  
| Field            | Type    | Description             |  
|------------------|---------|-------------------------|  
| `productId`      | String  | Unique product ID       |  
| `name`           | String  | Name of the product     |  
| `stockRemaining` | Number  | Current stock available |  
| `image`          | String  | Product image URL       |  

---

### **3. Request Schema** (`Request.js`)  
| Field            | Type     | Description                        |  
|------------------|----------|------------------------------------|  
| `userId`         | ObjectID | Reference to User                 |  
| `productId`      | ObjectID | Reference to Product              |  
| `quantity`       | Number   | Quantity requested                |  
| `purpose`        | String   | Purpose of request                |  
| `isReturnable`   | Boolean  | True/False for return eligibility |  
| `fromDate`       | Date     | Start date of request             |  
| `toDate`         | Date     | End date of request               |  
| `requestDate`    | Date     | Date of request submission        |  
| `status`         | String   | Pending, Approved, Rejected       |  
| `trackingStatus` | String   | Pending, Shipped, Delivered       |  
| `isReturned`     | Boolean  | If the product is returned        |  

---

## 🔄 **Workflow**  
### ➡️ **User Flow:**  
1. User logs in via `Login.jsx`.  
2. Views dashboard and submits request via `RequestForm.jsx`.  
3. Request status updates to "Pending" in `Request.js`.  
4. Tracks order via `OrderTracking.jsx` with timeline.  
5. Returns items if applicable, updating stock in `requestController.js`.  

### ➡️ **Admin Flow:**  
1. Admin logs in via `Login.jsx`.  
2. Manages users (`UserManagement.jsx`) and stock (`ManageInventory.jsx`).  
3. Reviews requests in `RequestList.jsx`.  
4. Approves/rejects requests, adjusting stock in `requestController.js`.  
5. Tracks orders and updates statuses in `OrderTracking.jsx`.  

---

## 🚧 **Development Phases**  
✅ **Phase 1 – Initial Setup**: Configured MERN stack, set up folder structure (`backend/` and `frontend/`).  
✅ **Phase 2 – Core Backend Development**: Built APIs (`authRoutes.js`, `requestRoutes.js`), schemas, and security (`authMiddleware.js`).  
✅ **Phase 3 – Core Frontend Development**: Developed UI components (`UserDashboard.jsx`, `AdminDashboard.jsx`) and integrated APIs.  
✅ **Phase 4 – Integration**: Linked frontend and backend with Axios for real-time sync.  
⏳ **Phase 5 – Deployment**: Local deployment complete, cloud deployment pending.

---

## 💪 **Team Contributions**  
👨‍💻 **Jayasuriya J (7376212IT160)** *(Frontend Developer)*  
- Developed `UserDashboard.jsx`, `RequestForm.jsx`, `Login.jsx`, and `Register.jsx`.  
- Integrated JWT authentication and Recharts for analytics.  

👨‍💻 **Santhosh K (7376212IT221)** *(Backend Developer)*  
- Built backend logic (`requestController.js`, `/api/requests`).  
- Created MongoDB schemas (`User.js`, `Product.js`, `Request.js`) and controllers.  

👨‍💻 **Rakesh M (7376212IT208)** *(Full Stack Developer)*  
- Integrated `OrderTracking.jsx` and `RequestList.jsx` with APIs.  
- Optimized real-time updates and API security (`authMiddleware.js`).  

👨‍💻 **Praveen R (7376212IT201)** *(Admin Panel Developer)*  
- Developed `AdminDashboard.jsx`, `UserManagement.jsx`, and `ManageInventory.jsx`.  
- Implemented responsive styling and status updates.  

---

## 🎯 **Project Status**  
✅ Fully functional backend (`server.js`) and frontend (`App.jsx`) with local deployment.  
✅ Secure authentication and role-based access via JWT and middleware.  
✅ Real-time updates and API integration (e.g., stock sync in `UserDashboard.jsx`).  
⏳ Pending full testing (unit/integration), UI refinements (accessibility, mobile), and cloud deployment.

---

## 🔥 **Future Scope**  
✅ Deploy on AWS/Heroku/Vercel for scalability.  
✅ Enhance mobile responsiveness and support.  
✅ Integrate predictive stock analysis using AI.  
✅ Add barcode/QR code scanning for inventory tracking.  

---

## 🌟 **Conclusion**  
The **Consumable Details Management Portal** is a robust solution for managing consumables, automating stock management, approval workflows, and real-time tracking. With a functional MERN-based system and ongoing enhancements, it significantly improves operational efficiency and reduces costs, poised for broader deployment and future scalability. ✅

---
