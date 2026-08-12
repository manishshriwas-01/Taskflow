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