#  TaskFlow – MEAN Stack Task Management Application

TaskFlow is a task management application developed as part of my MEAN Stack training. The project is being built incrementally to learn Angular, RxJS, Authentication, HTTP APIs, Routing, Reactive Forms, and other modern web development concepts.

---

# Project Timeline

## Day 0 – Project Planning

### Learning
- Understood the MEAN Stack project roadmap.
- Planned the application architecture.

### Implemented
- Selected **TaskFlow** as the project.
- Defined the overall project goal and development phases.

---

# Phase 0 – Project Setup & Planning

##  Day 1 – Feature Planning

### Learning
- Requirement Analysis
- User Stories
- Acceptance Criteria

### Implemented
- Selected **TaskFlow** as the application.
- Created feature list.
- Wrote user stories.
- Defined acceptance criteria.

---

## Day 2 – UI Design & Entity Planning

### Learning
- UI Planning
- Entity Relationship Design

### Implemented
- Designed Login page.
- Designed Dashboard.
- Designed Task Form.
- Identified entities:
  - User
  - Project
  - Task

---

##  Day 3 – JSON Data Design

### Learning
- JSON Structure
- Object Relationships

### Implemented
- Designed JSON structure for:
  - User
  - Project
  - Task
- Created sample-data.json.

---

##  Day 4 – Repository Setup

### Learning
- Git & GitHub Basics

### Implemented
- Created GitHub repository.
- Added README.md.
- Added .gitignore.
- Created:
  - client/
  - server/

---

##  Day 5 – Node.js Data Processing

### Learning
- Node.js
- File System
- JSON Handling

### Implemented
- Loaded sample JSON.
- Grouped tasks by status.
- Sorted tasks by due date.

---

# Phase 1 – Angular Frontend

##  Day 6 – Angular Setup & Components

### Learning
- Angular CLI
- Standalone Components
- Templates
- Data Binding

### Implemented
- Created Angular application.
- Built initial TaskFlow UI.
- Created Dashboard component.

---
## Day 7 – Components & Services

### Learning
- Components
- Services
- Dependency Injection

### Implemented
- Created TaskList component.
- Created TaskCard component.
- Rendered tasks dynamically using **@for**.

---

##  Day 8 – Signals & State Management

### Learning
- Angular Signals
- signal()
- update()

### Implemented
- Created Signal-based TaskService.
- Implemented:
  - Add Task
  - Edit Task
  - Delete Task

---

##  Day 9 – Routing

### Learning
- Angular Routing
- routerLink
- Route Parameters

### Implemented
- Login page
- Dashboard
- Task Details page
- Navbar
- 404 Not Found page

---

##  Day 10 – Reactive Forms

### Learning
- FormBuilder
- Validators
- Reactive Forms

### Implemented
- Built Add/Edit Task form.
- Added form validations.
- Displayed validation error messages.

---

# Phase 2 – Frontend Features

##  Day 11 – HttpClient & Mock REST API

### Learning
- HttpClient
- REST APIs
- Typed Models

### Implemented
- Configured json-server.
- Created Task interface.
- Loaded tasks using HttpClient GET.
- Connected Angular with db.json.

---

##  Day 12 – RxJS Search & Filtering

### Learning
- RxJS
- valueChanges
- debounceTime
- distinctUntilChanged

### Implemented
- Task search.
- Status filtering.
- Signals with effect().
- Started HTTP CRUD integration.

---

##  Day 13 – Custom Pipes & Directives

### Learning
- Custom Pipes
- Custom Directives
- @Input()
- Renderer2
- ElementRef
- ngOnChanges()

### Implemented
- Created **dueSoon** custom pipe.
- Created **StatusColorDirective**.
- Displayed user-friendly due dates.
- Added dynamic status colors to task cards.

---

## Day 14 – Authentication & Route Guards

### Learning
- Authentication
- Authorization
- AuthService
- Functional Route Guards
- localStorage

### Implemented
- Created AuthService.
- Implemented Login functionality.
- Implemented Logout functionality.
- Stored authentication token in localStorage.
- Protected Dashboard using Functional Route Guard.
- Added Login/Logout navigation.
- Restricted unauthorized access to protected routes.

---



### Day 15 – Angular Material & UI Polish
Learning
Angular Material
Material UI Components
Responsive UI Design
Material Forms & Cards
Material Buttons & Icons

### Implemented

Applied Angular Material mat-toolbar to the Navbar.
Converted the Add/Edit Task form to Material form fields.
Added Material inputs and dropdowns for task details.
Converted Search and Status Filter to Material components.
Converted TaskCard into a Material mat-card.
Added Material buttons and icons for Edit, Delete, and Details.
Improved the TaskFlow board layout and responsiveness.
Integrated Task Details with GET /tasks/:id API.
Preserved existing dueSoon pipe and StatusColorDirective.
Completed the Frontend MVP with mock REST API.


## Day 16 – Express Server Setup

### Learning

- Express.js fundamentals
- Express application and server setup
- Middleware
- Request and Response objects
- HTTP GET routes
- Request logging
- `next()` middleware function

### Implemented

- Scaffolded an Express server inside the `server/` folder.
- Initialized the Node.js backend using `npm init`.
- Installed and configured Express.js.
- Created a basic Express application running on port 3000.
- Added a `/health` GET route for server health checking.
- Added JSON parsing middleware using `express.json()`.
- Implemented a request logger middleware to log HTTP method and URL.
- Understood how middleware processes requests using `req`, `res`, and `next()`.


## Day 17 – Tasks CRUD API

### Learning

- Express REST APIs
- CRUD operations
- HTTP methods and status codes
- Route parameters
- Request body handling
- API validation and error handling

### Implemented

- Created an in-memory tasks array in the Express server.
- Implemented `GET /api/tasks` to fetch all tasks.
- Implemented `POST /api/tasks` to create new tasks.
- Implemented `PUT /api/tasks/:id` to update existing tasks.
- Implemented `DELETE /api/tasks/:id` to delete tasks.
- Implemented `GET /api/tasks/:id` for individual task details.
- Added request validation and proper `400` and `404` error responses.
- Used appropriate HTTP status codes: `200`, `201`, and `204`.
- Tested all CRUD APIs using Postman.
- Updated the Angular `Services` to use the Express API instead of `json-server`.
- Successfully connected the TaskFlow Angular frontend with the Express backend.
- Verified task loading and task details through the Express API.

----

# Day 18 – Project & Task APIs
Learning
Express Routes & Controllers
API response consistency
CRUD API architecture
Request validation
Route parameters
Implemented
Created separate routes/ and controllers/ structure.
Implemented complete Projects CRUD API.
Organized Tasks CRUD API using routes and controllers.
Added validation and proper HTTP status codes (200, 201, 204, 400, 404).
Added consistent API response format using success and data.
Connected Angular frontend with the updated Task API response structure.
Deliverable

Organized Projects & Tasks CRUD APIs with validation and consistent response shapes.

---

# Day 19 – Validation, Error Handling & Configuration
Learning
express-validator
Validation middleware
Central error-handling middleware
CORS configuration
Environment variables using dotenv
Implemented
Added express-validator for Task API input validation.
Created separate validators for Task creation and update.
Added validation middleware using validationResult().
Implemented centralized error-handling middleware.
Configured CORS to allow the Angular frontend.
Added dotenv configuration for environment variables.
Moved the server port configuration to .env.
Updated the backend structure to keep validation and error handling separate from controllers.
Deliverable

Validated and structured Express APIs with centralized error handling, CORS, and environment-based configuration.


---
 # Day 20 — Authentication & JWT Integration

- Connected Angular frontend authentication with the Express.js backend.
- Implemented user registration with password hashing using bcrypt.
- Implemented login API with bcrypt password verification and JWT generation.
- Stored the JWT token in browser localStorage after successful login.
- Protected the dashboard using Angular AuthGuard.
- Implemented an Angular HTTP Interceptor to automatically attach the JWT token to API request headers.
- Implemented backend authentication middleware to verify JWT tokens and protect task/project APIs.
- Tested protected APIs using Postman with Bearer Token authentication.

## Authentication Flow

Register:
Angular → Auth API → bcrypt hash → User created

Login:
Angular → Auth API → bcrypt verify → JWT generated → localStorage

Protected API:
Angular → HTTP Interceptor → Authorization: Bearer JWT
→ Express Auth Middleware → JWT verification → Controller → Response

----

# Day 21 — MongoDB Setup & Connection
Set up MongoDB Atlas and created the taskflow database.
Configured MongoDB user and network access.
Added MongoDB connection string to .env and kept it gitignored.
Installed Mongoose and connected the Express backend to MongoDB Atlas.
Connected MongoDB Compass to the TaskFlow database.
Deliverable

MongoDB Atlas + Compass setup completed and Express backend successfully connected to the taskflow database.

---
# Day 22 — Mongoose Models
Created Mongoose models for User, Project, and Task.
Added schema validation, timestamps, and MongoDB ObjectId references.
Defined User → Project and Project → Task relationships.
Added status and priority validation for tasks.
Structured the models according to the TaskFlow entities and relationships.
Deliverable

Defined complete Mongoose schemas/models for Users, Projects, and Tasks with validation, timestamps, and references.

---
# Day 23 — MongoDB Integration & Error Handling

Replaced the in-memory store with MongoDB across the API routes.

Updated task and project CRUD operations to use Mongoose and MongoDB.

Added proper not-found handling and database error handling.

Verified the API flow with the Angular frontend.

Deliverable

Persistent MongoDB-backed API with proper not-found and error handling.

---

# Day 24 — API Testing

Implemented API testing for TaskFlow using Jest and Supertest.

Added tests for authentication and task APIs covering both successful and error scenarios.

Tested user registration, duplicate email, invalid data, login, wrong password, and non-existing user cases.

Tested task fetching and task creation with authenticated requests.

Fixed issues found during testing and verified the APIs with passing test cases.

### Deliverable

Implemented Jest + Supertest API tests for Auth and Tasks with happy and error paths.


---

# Day 25 — API Deployment

Cleaned the backend repository and deployed the TaskFlow API to Render with MongoDB Atlas.

Configured production environment variables and verified the live health and authentication endpoints.

Verified the deployed API is successfully connected to MongoDB Atlas.

### Live API

https://taskflow-5uoj.onrender.com/health

### Deliverable

Deployed and verified the live TaskFlow API on Render with MongoDB Atlas.



---

# Day 26 — Angular API Integration & Authentication

Connected the Angular frontend with the deployed TaskFlow API on Render.

Implemented JWT token storage and configured an HTTP interceptor to attach the JWT token to protected API requests.

Verified frontend-to-backend communication using the live API.

### Deliverable

Angular frontend connected to the live API with JWT-based authentication


---

# Day 27 — Live Task CRUD & Frontend Deployment

- Connected Angular task operations with the deployed TaskFlow API.
- Implemented and verified task CRUD operations using the live backend.
- Added proper project name display in task cards.
- Fixed `projectId` type handling for string and populated project objects.
- Deployed the Angular frontend on Render.
- Verified the live frontend with the deployed backend API.

## Live Project

Frontend: https://taskflow-1-0-bknj.onrender.com/

Backend API: https://taskflow-5uoj.onrender.com/health

# Day 28 – TaskFlow

## Today's Progress

- Added pagination to the Dashboard project list.
- Added pagination to the Project Tasks page.
- Implemented clickable page numbers for direct navigation.
- Added Previous and Next controls.
- Added task search and status filtering.
- Improved responsive UI for Dashboard and Project Tasks.
- Updated task and project forms with consistent styling.
- Removed unnecessary console logs for production.
- Fixed frontend CSS and production build issues.
- Prepared the application for deployment on Render.

## Key Learning

- Client-side pagination in Angular.
- Combining filtering with pagination.
- Handling page navigation and page state.
- Responsive CSS design.
- Preparing Angular applications for production deployment.

## Status

TaskFlow frontend UI, filtering, pagination and production improvements completed.