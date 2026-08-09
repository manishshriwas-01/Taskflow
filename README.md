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
