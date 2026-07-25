# TaskFlow

TaskFlow is a task management application built using the MEAN Stack (MongoDB, Express.js, Angular, and Node.js). It helps users organize their work by creating projects and managing tasks in a simple and efficient way.

## Overview

The goal of TaskFlow is to provide a simple platform where users can:

- Create and manage projects
- Add, edit, and delete tasks
- Track task status and priority
- Set due dates
- Search and filter tasks
- Monitor project progress

## Features

- User Authentication
- Project Management
- Task Management
- Dashboard
- Search & Filter
- Task Status Tracking
- Priority Management
- Due Date Management
- Responsive User Interface

## Tech Stack

### Frontend
- Angular

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Tools
- Git
- GitHub
- VS Code

## Project Structure

```text
TaskFlow/
│
├── client/
│
├── server/
│
├── docs/
│   ├── features.md
│   ├── user-stories.md
│   ├── entities.md
│   └── sample-data.json
│
├── .gitignore
│
└── README.md
```

## Data Model

The application is based on three core entities:

- User
- Project
- Task

Relationship:

```text
User
 │
 └── Projects
        │
        └── Tasks
```

### User
A user can create and manage multiple projects.

### Project
A project belongs to one user and contains multiple tasks.

### Task
A task belongs to one project and stores information such as title, description, priority, status, and due date.

## API

REST APIs will be implemented for:

- Authentication
- User Management
- Project Management
- Task Management

## Future Enhancements

- JWT Authentication
- Email Verification
- File Attachments
- Team Collaboration
- Notifications
- Dashboard Analytics
- Dark Mode
- Application Deployment

## Installation

Instructions will be added after the project setup is completed.

## Usage

Usage instructions will be added during development.

## Contributing

This project is currently under development as part of an internship training program.

## License

This project is intended for educational and learning purposes.

## Author

Manish Shriwas# Taskflow
# Taskflow
# Taskflow
