/*****************
 * @Dependencies *
 *****************/

//Book Model
const Book = require('./bookModel');
//Request Error Handler
const errorHandler = require('../../utils/error/errorHandler');

/********************
 * @RequestHandlers *
 ********************/

/**
 * Get All Books From DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @returns {Response} :
 * * Status : 200 OK
 * * Data : json( [ Books ] )
 * @Errors :
 * * ! DB Error => ErrorHandler(500)
 */
const getAll = (req, res) => {
  //Fetch DB
  Book.find()
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then(data => {
      //Response
      res.status(200).json(data);
    });
};

/**
 * Get Book From DB By ISBN
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @Requires :
 * * Request.Params (
 * * * { ISBN : String } )
 * @returns {Response} :
 * * Status : 200 OK
 * * Data : json( Book Data )
 * @Errors :
 * * ! DB Error => ErrorHandler(500)
 */
const getByISBN = (req, res) => {
  //Get ISBN From Request URL
  const ISBN = req.params.ISBN;
  //Fetch DB By ISBN
  Book.findOne({ ISBN })
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then(data => {
      //Response
      res.status(200).json(data);
    });
};

/**
 * Save Book In DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @Requires :
 * * Request.Body (
 * * * Book : {
 * * *       ISBN : String ,
 * * *       title : String ,
 * * *       description : String ,
 * * *       publishYear : Number
 * * *       } )
 * @returns {Response} :
 * * Status : 201 Created
 * * Data : json( New Book Data )
 * @Errors :
 * * ! Conflict => ErrorHandler(409)
 * * ! DB Error => ErrorHandler(500)
 */
const save = (req, res) => {
  //Get Book Properties
  const { ISBN, title, description, publishYear } = req.body;

  //Fetch DB By ISBN
  Book.findOne({ ISBN })
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then(data => {
      //Check If Book Already Exists
      //! => Request Error Handler Code 409
      if (data) return errorHandler(res, 409);
      //Construct New Book
      const newBook = new Book({ ISBN, title, description, publishYear });
      //Save New Book To DB
      newBook
        .save()
        .catch(() => {
          //! Request Error Handler Code 500
          return errorHandler(res, 500);
        })
        .then(data => {
          //Response
          res.status(201).json(data);
        });
    });
};

/**
 * Update Book In DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @Requires :
 * * Request.Params (
 * * * { ISBN : String } )
 * * & Request.Body (
 * * * Book : {
 * * *      ISBN ? : String ,
 * * *       title ? : String ,
 * * *       description ? : String ,
 * * *       publishYear ? : Number
 * * *       } )
 * @returns {Response} :
 * * Status : 200 OK
 * * Data : json( { msg: 'Update Successfully' } )
 * @Errors :
 * * ! Not Found => ErrorHandler(404)
 * * ! DB Error => ErrorHandler(500)
 */
const updateByISBN = (req, res) => {
  //Get ISBN From Request Params
  const ISBN = req.params.ISBN;
  //Get Data From Request Body
  const data = req.body;
  //Fetch DB => Update Book By ISBN
  Book.findOneAndUpdate({ ISBN }, data)
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then(data =>
      //Check Data Found
      data
        ? //Response
          res.status(200).json({ msg: 'Update Successfully' })
        : //! Request Error Handler Code 404
          errorHandler(res, 404)
    );
};

/**
 * Delete Book From DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @Requires :
 * * Request.Params (
 * * * { ISBN : String } )
 * @returns {Response} :
 * * Status : 200 OK
 * * Data : json( { msg: 'Deleted Successfully' } )
 * @Errors :
 * * ! Not Found => ErrorHandler(404)
 * * ! DB Error => ErrorHandler(500)
 */
const deleteByISBN = (req, res) => {
  //Get ISBN From Request Params
  const ISBN = req.params.ISBN;
  //Fetch DB => Delete Book By ISBN
  Book.findOneAndDelete({ ISBN })
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then(data =>
      //Check Data Found
      data
        ? //Response
          res.status(200).json({ msg: 'Deleted Successfully' })
        : //! Request Error Handler Code 404
          errorHandler(res, 404)
    );
};

/************
 * @Exports *
 ************/

module.exports = {
  //Get All Books From DB
  getAll,
  // Get Book From DB By ISBN
  getByISBN,
  //Save Book In DB
  save,
  //Update Book In DB
  updateByISBN,
  //Delete Book In DB
  deleteByISBN
};
