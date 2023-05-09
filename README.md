## Library Management System

This project is a web-based library management system that allows users to sign up as either a librarian or a member and perform various actions based on their role. Librarians can add, update, and remove books and members, while members can view, borrow, and return available books.

The project is built using Node.js and MongoDB, and follows the Model-View-Controller (MVC) architectural pattern.
Installation

To install the project, first clone the repository:

bash

git clone https://github.com/satyaveer1994/VLabs-assignment.git

Then, install the dependencies using npm:


cd VLABS-ASSIGNMENT
npm install

Usage

To start the project, run the following command:



nodemon src/index.js

This will start the Node.js server and make the web application available at http://localhost:3000.
API Endpoints

# The following API endpoints are available:

# Books

    router.get("/allBook",);
    router.post("/addBook");
    router.put("/:id", );
    router.delete("/:id",);


# Members

    router.get("/allMember",);
    router.post("/addMember",);
    router.put("/:id",);
    router.delete("/:id");

# Borrowing

    router.post('/addBorrow');
    router.put('/:id');


# Users

    router.post('/register', userController.register);
    router.post('/login', userController.login);


# Authentication

All API endpoints except for user creation and authentication require a JWT access token obtained by logging in as a librarian or member. The access token should be included in the Authorization header of the HTTP request as a Bearer token.
# Contributing

If you would like to contribute to this project, please submit a pull request with your changes.
# License

This project is licensed under the MIT License - see the LICENSE file for details.