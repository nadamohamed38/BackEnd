# Wedding & Event Planning Marketplace – Backend

A Node.js + Express + Sequelize backend for a digital platform that connects clients, vendors, and venues. The platform provides all-in-one A Node.js + Express backend API for managing wedding planning services.
This system supports clients, vendors, bookings, events, reviews, and a community section where vendors can showcase their work.
Admins have control over vendor approvals and community moderation.

---

# Run & Setup:
```bash
npm install express
node server.js
```

# Features

## Clients

- Register and manage profiles
- Book vendors and venues
- Leave reviews for services

## Vendors

- Register and manage vendor profiles
- Offer services (catering, photography, decoration, etc.)
- Post their work in the Community

## Admin

- Approve or reject vendors
- Moderate community posts
- Manage users and system content

## Events & Bookings

- Clients can create events
- Book vendors and venues for events
- Manage guest count, date, and budgets

## Community

- Vendors share posts (portfolio, recent work, promotions)
- Clients browse posts for inspiration and vendor selection
- Admin moderates posts

## Reviews

- Clients can review vendors and venues
- Ratings help others choose trusted services

---

# Installation & Setup

## Install dependencies:
```bash 
npm install
```

## Run database:
```bash
node config/db.js
```

## Start server:
```bash
node server.js
```
- API : **http://localhost:3000**

---
# API Endpoints

## Clients

- All protected routes require a valid JWT Token in the request header:
**Authorization: Bearer <token>**

### Register (Signup)
- POST /api/client/register
- Request Body EX:
```bash 
{
  "name": "Mona Youssef",
  "email": "mona.youssef@example.com",
  "password": "monaPass",
  "phone": "01087654321",
  "points": 0
}
```

### Login
- POST /api/client/login
- Request Body EX:
```bash 
{
  "email": "john@example.com",
  "password": "mypassword123"
}
```

### Get All Clients (Protected)

- GET /api/client/

---

## Admin 

- All protected routes require a valid JWT Token in the request header:
**Authorization: Bearer <token>**

### Register (Signup)
- POST /api/admin/register
- Request Body EX:
```bash 
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepassword",
  "phone": "1234567890"
}
```

### Login
- POST /api/admin/login
- Request Body EX:
```bash 
{
  "email": "john@example.com",
  "password": "mypassword123"
}
```

### Delete Operations

- Note: Only admins can delete. Deleting a resource also removes its dependent records.

#### Delete Vendor
- DELETE /api/admin/vendor/:id
- Deletes:
    CommunityPosts by vendor
    Bookings by vendor
    Reviews of vendor

#### Delete Client
- DELETE /api/admin/client/:id
- Deletes:
    Reviews by client
    Events by client

#### Delete Venue
- DELETE /api/admin/venue/:id
- Deletes:
    Bookings for venue
    Reviews for venue

#### Delete Review
- DELETE /api/admin/review/:id

#### Delete Community Post
- DELETE /api/admin/post/:id
---

## Booking

### Create a Booking
- POST /api/bookings
```bash
{
  "status": "confirmed",
  "vendor_id": 1,
  "venue_id": 2,
  "event_id": 3,
  "client_id": 4,
  "date": "2025-09-20"
}
```

### Get All Bookings
- GET /api/bookings

### Get Booking by Status
- GET /api/bookings/:status

### Get Bookings by Vendor Name
- GET /api/bookings/vendor/:name

### Get Bookings by Venue Name
- GET /api/bookings/venue/:name

### Get Bookings by Event Name
- GET /api/bookings/event/:name

--- 

## Community Posts

### Create a Community Post
- POST /api/communityPost
- body :
```bash
{
  "title": "Grand Opening!",
  "content": "Join us for our new branch opening.",
  "vendor_id": 1
}
```
### Get All Community Posts
- GET /api/communityPost

### Get Posts by Vendor Name
- GET /communityposts/vendor/:name

---

## Event

### Create Event
- POST API/event
- Request Body Example:
```bash
{
  "name": "Tech Conference 2025",
  "location": "Cairo, Egypt",
  "date": "2025-09-30"
}
```
### Get All Events
- GET /events

### Get Event by Date
- GET /events/date/:date

---

## Review 

### Create Review
POST API/review
```bash
{
  "content": "Great service and very professional!",
  "rating": 5,
  "vendor_id": 1,
  "venue_id": null,
  "client_id": 2
}
```

### Get All Reviews
- GET /reviews

### Get Reviews by Vendor Name
- GET /reviews/vendor/:name

### Get Reviews by Venue Name
- GET /reviews/venue/:name

---
# Vendor

### Vendor Registration (Signup)
- POST /vendor/register
- body :
```bash
{
  "name": "Flower Decor",
  "email": "flower@example.com",
  "password": "securePassword123",
  "phone": "1234567890",
  "category": "Decoration"
}
```

### Vendor Login
- POST /vendors/login
- body :
```bash
{
  "email": "flower@example.com",
  "password": "securePassword123"
}
```
### Get All Vendors
- GET /vendors

### Get Vendor by Name (Search)
- GET /vendors/:name

---

# Venue 

### Create Venue
- POST API/venues
- body :
```bash
{
  "name": "Grand Ballroom",
  "location": "Downtown City",
  "capacity": 300,
  "price": 5000
}
```

### Get All Venues
- GET /venues

---
