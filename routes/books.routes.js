const express = require("express");

const router = express.Router();
//data management routes
const BookModel = require("../models/book.model");

const { createBookValidationRules, 
  updateBookValidationRules, 
  idValidationRules, 
  handleValidationErrors, validationResult } = require("../validators/book.validator");


//create a book
router.post("/", 
  createBookValidationRules, 
  handleValidationErrors, async(req, res) => {    
    try {
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 const newBook = await BookModel.create(req.body);
  res.status(201).json({ message: req.t("book_created"), book: newBook });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get all books
router.get("/", async(req, res) => {  
  try {
    const books = await BookModel.find({});
    if (!books || books.length === 0) {
      return res.status(404).json({ error: req.t("books_not_found") });
    }
    res.status(200).send(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get a book by id
router.get("/:id", 
  idValidationRules, 
  handleValidationErrors, async(req, res) => {  
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ error: req.t("book_not_found") });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete a book
router.delete("/:id", idValidationRules, handleValidationErrors, async(req, res) => {  
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: req.t("book_not_found") });
    }
    res.status(200).json({ message: req.t("book_deleted") });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update a book
router.put("/:id", idValidationRules, updateBookValidationRules, handleValidationErrors, async(req, res) => {  
  try {
    const { id } = req.params;
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: req.t("book_not_found") });
    }
    res.status(200).json({ message: req.t("book_updated"), book: updatedBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;