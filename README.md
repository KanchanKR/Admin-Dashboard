<<<<<<< HEAD
# Admin-Panel
=======
# React + Vite


# Admin Panel - React App

## Overview

This project is a responsive Admin Panel built using **React** with key features including user management (add, edit, delete users), role-based UI components, pagination, search functionality, and user filters based on roles and status. The app utilizes mock API services for data manipulation.

## Features

- **User Management**: Add, edit, and delete users.
- **Role-Based UI**: Display roles with specific styling (e.g., Super Admin, Admin, Editor, Viewer, etc.).
- **Search & Filters**: Search users by name/email and filter them based on roles and statuses.
- **Edit Functionality**: Edit user names and emails, preserving roles and status.
- **Pagination**: Manage users with pagination, showing limited users per page.
- **Delete Confirmation**: Confirmation modal before deleting a user.
- **Audit Log**: All the actions that a user can perform will be displayed in log tab.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Framer Motion**: Animations and transitions in the app.
- **Lucide React**: Icon library for UI elements.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Mock API**: Custom API mock service for handling users.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Mock API](#mock-api)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

To get a local copy of the project up and running, follow these simple steps:

### Prerequisites

Make sure you have Node.js and npm installed:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

### Clone the repo

```bash
git clone https://github.com/KanchanKR/Admin-Dashboard
```

### Install dependencies

Navigate into the project directory and run the following command:

```bash
npm install
```

This will install all the necessary dependencies.

---

## Usage

After installing the dependencies, start the development server:

```bash
npm start
```

This will open the project in your browser at `http://localhost:5173/`.

You will see the Admin Panel with a table of users, where you can:

- **Search** users by name or email.
- **Filter** users by role and status.
- **Edit** a user's name and email (with real-time validation).
- **Add** new users via the `UserAdd` component.
- **Delete** a user after confirming with a modal.

---

## Mock API

The project uses a mock API to simulate data interaction, located in the `/mockapi` directory.

### Endpoints:

1. **Get Users**:
   - `GET /users`: Fetches the list of users.
2. **Add User**:
   - `POST /users`: Adds a new user.
3. **Update User**:
   - `PUT /users/{id}`: Updates the name and email of a user.
4. **Delete User**:
   - `DELETE /users/{id}`: Deletes a user based on their ID.

The mock API is configured in the project and ready to use.

---

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.
- `npm run eject`: Removes the single build dependency and exposes the configuration files.

---

## Folder Structure

```bash
├── public/
│   └── index.html           # Main HTML file
├── src/
│   ├── components/
│   │   ├── UsersTable.jsx    # User table component with editing, deletion, and pagination features
│   │   ├── UserAdd.jsx       # Component for adding new users
│   ├── mockapi/
│   │   └── mockApi.js        # Mock API service to simulate user data
│   ├── App.js                # Main app component
│   ├── index.js              # Entry point of the React application
│   └── styles.css            # Custom CSS (uses Tailwind CSS)
└── package.json              # Project dependencies and scripts
```

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you want to contribute:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewFeature`).
3. Commit your Changes (`git commit -m 'Add NewFeature'`).
4. Push to the Branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Kanchan Renapurkar - [LinkeDin](www.linkedin.com/in/kanchan-renapurkar) - renapurkarkanchan@gmail.com

Project Link: [Admin-Panel]((https://github.com/KanchanKR/Admin-Dashboard))

---
