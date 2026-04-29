const {body, validationResult, param} = require("express-validator");


const updateBookValidationRules = [
  param("id")
    .isMongoId()
    .withMessage((value, { req }) => req.t("invalid_book_id")),

  body("bookName")
    .optional()
    .isLength({ min: 3, max: 255 })
    .withMessage((value, { req }) => req.t("book_name_length")),

  body("countInStock")
    .optional()
    .isInt({ min: 0 })
    .withMessage((value, { req }) => req.t("count_in_stock_invalid")),

  body("price")
    .optional()
    .isFloat({ min: 1 })
    .withMessage((value, { req }) => req.t("price_invalid")),

  body("image")
    .optional()
    .isURL()
    .withMessage((value, { req }) => req.t("image_invalid"))
];

const createBookValidationRules = [
  body("bookName")
    .notEmpty()
    .withMessage((value, { req }) => req.t("book_name_required"))
    .isLength({ min: 3, max: 255 })
    .withMessage((value, { req }) => req.t("book_name_length")),

  body("countInStock")
    .notEmpty()
    .withMessage((value, { req }) => req.t("count_in_stock_required"))
    .isInt({ min: 0 })
    .withMessage((value, { req }) => req.t("count_in_stock_invalid")),

  body("price")
    .notEmpty()
    .withMessage((value, { req }) => req.t("price_required"))
    .isFloat({ min: 1 })
    .withMessage((value, { req }) => req.t("price_invalid")),

  body("image")
    .notEmpty()
    .withMessage((value, { req }) => req.t("image_required"))
    .isURL()
    .withMessage((value, { req }) => req.t("image_invalid"))
];

const idValidationRules = [
  param("id")
    .isMongoId()
    .withMessage((value, { req }) => req.t("invalid_book_id")),
];


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  
  module.exports = {
    createBookValidationRules,
    updateBookValidationRules,
    idValidationRules,
    handleValidationErrors,
    validationResult,
  };