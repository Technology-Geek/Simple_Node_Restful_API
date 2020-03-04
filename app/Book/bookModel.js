/*****************
 * @Dependencies *
 *****************/

//MongoDB ODM
const mongoose = require('mongoose');

/***********
 * @Schema *
 ***********/

//Schema Class
const Schema = mongoose.Schema;

//Create Schema
const BookSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, select: false },
    ISBN: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    publishYear: {
      type: Number,
      required: true
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
    __v: { type: Number, select: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/**********
 * @Model *
 **********/

//Create Model
const Book = mongoose.model('book', BookSchema, 'books');

/************
 * @Exports *
 ************/

//DB Model
module.exports = Book;
