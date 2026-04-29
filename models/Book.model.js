const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    // bookName: {
    //     type: String,
    //     required: [true, "Book name is required"],
    //     unique: true,
    //     minlength: [3, "Book name must be at least 3 characters"],
    //     maxlength: [255, "Book name must be at most 255 characters"],
    // },
    // countInStock: {
    //     type: Number,
    //     required: [true, "Count in stock is required"],
    //     min: [0, "Count in stock must be a non-negative number"],
    // },
    // price: {
    //     type: Number,
    //     required: [true, "Price is required"],
    //     min: [1, "Price must be a positive number"],
    //     max: [10000, "Price must be at most 10000"],
    // },
    // dateCreated: {
    //     type: Date,
    //     default: Date.now,
    // },
    // image: {
    //     type: String,
    //     default: "",
    //     // validate: {
    //     //     validator: function (v) {
    //     //         return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v);
    //     //     },
    //     //     message: "Invalid image URL",
    //     // },
    // },
});

bookSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

bookSchema.set("toJSON", {
    virtuals: true,
});

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;