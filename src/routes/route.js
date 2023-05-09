const express = require('express');
const router = express.Router();

const authenticate= require('../middleware/auth')
const userController = require('../controllers/userController');
const BookController = require("../controllers/bookController");
const BorrowingController = require('../controllers/borrowingController');
const MemberController = require("../controllers/memberController");




router.post('/register', userController.register);
router.post('/login', userController.login);



router.get("/allBook", BookController.getAllBooks);
router.post("/addBook", authenticate, BookController.addBook);
router.put("/:id", authenticate, BookController.updateBook);
router.delete("/:id", authenticate, BookController.deleteBook);



router.post('/addBorrow', authenticate, BorrowingController.borrowBook);
router.put('/:id', authenticate, BorrowingController.returnBook);




router.get("/allMember", MemberController.getAllMembers);
router.post("/addMember", authenticate, MemberController.addMember);
router.put("/:id", authenticate, MemberController.updateMember);
router.delete("/:id", authenticate, MemberController.deleteMember);

module.exports = router;