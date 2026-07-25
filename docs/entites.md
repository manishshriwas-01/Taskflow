# TaskFlow Entities & Relationships

## Overview

TaskFlow is built around three core entities:

 User
 Project
 Task

A user can create multiple projects, and each project can contain multiple tasks.

# Entity: User

The User represents a person who can log in and manage projects and tasks.

## Attributes

| Field     | Type     | Description           |
| --------- | -------- | --------------------- |
| id        | ObjectId | Unique identifier     |
| name      | String   | Full name             |
| email     | String   | Unique email address  |
| password  | String   | Encrypted password    |
| createdAt | Date     | Account creation date |
| updatedAt | Date     | Last profile update   |


# Entity: Project

The Project groups related tasks together.

## Attributes

| Field       | Type     | Description           |
| ----------- | -------- | --------------------- |
| id          | ObjectId | Unique identifier     |
| name        | String   | Project name          |
| description | String   | Project description   |
| userId      | ObjectId | Owner of the project  |
| createdAt   | Date     | Project creation date |
| updatedAt   | Date     | Last update date      |

# Entity: Task

A Task represents a single unit of work inside a project.

## Attributes

| Field       | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| id          | ObjectId | Unique identifier               |
| title       | String   | Task title                      |
| description | String   | Task description                |
| status      | String   | Pending, In Progress, Completed |
| priority    | String   | Low, Medium, High               |
| dueDate     | Date     | Task deadline                   |
| projectId   | ObjectId | Associated project              |
| createdAt   | Date     | Task creation date              |
| updatedAt   | Date     | Last update date                |


# Relationships

## User → Project

Relationship: One-to-Many (1:N)

 One user can create multiple projects.
 Every project belongs to one user.

Example:

User: Manish

Projects:

 Internship Training
 Personal Learning
 College Project



## Project → Task

Relationship: One-to-Many (1:N)

One project can contain multiple tasks.
Every task belongs to exactly one project.

Example:

Project: Internship Training

Tasks:

 Design Login Screen
 Build Task Board
 Create Task Form
 Connect REST API


# Workflow

```text
User
   │
   ▼
Create Project
   │
   ▼
Create Tasks
   │
   ▼
View & Manage Tasks
```

