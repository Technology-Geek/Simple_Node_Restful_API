/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');
//Book Controller
const bookController = require('./bookController');

//Book Validators
const {
  validateParamsBook,
  validateBodyBook,
  validateBodyOptionalBook
} = require('./bookValidator');

/***************************
 * @InitializeDependencies *
 ***************************/

//Initialize Express Router
const router = express.Router();

/*************************
 * @Route * @GET * /book *
 *************************/

/**
 * Get All Books Data
 *
 * @Access Public
 * @Middleware : None
 * @Handler : bookController => getAll
 * @Response :
 * * Status : 200 OK
 * * Data: json( [ Books ] )
 * @Errors :
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * GET * http://Address:Port/book
 * * * Params : Null
 * * * Query : Null
 * * * Body : Null
 * @Examples :
 * * http://localhost:7000/book
 * * * Params : Null
 * * * Query : Null
 * * * Body : Null
 */
router.get('/', bookController.getAll);

/**
 * Get Book Data By ISBN
 *
 * @Access Public
 * @Middleware :
 * * Validators :
 * * * validateParamsBook
 * @Handler bookController => getByISBN
 * @Response :
 * * Status : 200 OK
 * * Data: json( { Book } )
 * @Errors :
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * GET * http://Address:Port/book/:ISBN
 * * * Params : ISBN
 * * * Query : Null
 * * * Body : Null
 * @Examples :
 * * http://localhost:7000/book/ISBN123
 * * * Params : ISBN123
 * * * Query : Null
 * * * Body : Null
 */
router.get('/:ISBN', validateParamsBook, bookController.getByISBN);

/**************************
 * @Route * @POST * /book *
 **************************/

/**
 * Save Book
 *
 * @Access Public
 * @Middleware :
 * * Validators :
 * * * validateBodyBook
 * @Handler bookController => save
 * @Response :
 * * Status : 201 Created
 * * Data: json( { Saved Book } )
 * @Errors :
 * * ! Code 409 Conflict
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * POST * http://Address:Port/book
 * * * Params : Null
 * * * Query : Null
 * * * Body : Book Data
 * @Examples :
 * * http://localhost:7000/book
 * * * Params : Null
 * * * Query : Null
 * * * Body : application/json
 * * * * {
 * * * * "ISBN" : "aa123" ,
 * * * * "title" : "book123" ,
 * * * * "description" : "new book add" ,
 * * * * "publishYear" : 2014
 * * * * }
 */
router.post('/', validateBodyBook, bookController.save);

/*************************
 * @Route * @PUT * /book *
 *************************/

/**
 * Update Book Data By ISBN
 *
 * @Access Public
 * @Middleware :
 * * Validators :
 * * * validateBodyOptionalBook
 * @Handler bookController => updateByISBN
 * @Response :
 * * Status : 200 OK
 * * Data: json( { msg: 'Update Successfully' } )
 * @Errors :
 * * ! Code 404 Not Found
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * PUT * http://Address:Port/book/:ISBN
 * * * Params : ISBN
 * * * Query : Null
 * * * Body : Book Data ?
 * @Examples :
 * * http://localhost:7000/book/ISBN123
 * * * Params : ISBN123
 * * * Query : Null
 * * * Body : application/json
 * * * * {
 * * * * "ISBN" : "aa123" , ?
 * * * * "title" : "book123" , ?
 * * * * "description" : "new book add" , ?
 * * * * "publishYear" : 2014 ?
 * * * * }
 */
router.put('/:ISBN', validateBodyOptionalBook, bookController.updateByISBN);

/****************************
 * @Route * @DELETE * /book *
 ****************************/

/**
 * Delete Book Data By ISBN
 *
 * @Access Public
 * @Middleware :
 * * Validators :
 * * * validateParamsBook
 * @Handler bookController => deleteByISBN
 * @Response :
 * * Status : 200 OK
 * * Data : json( { msg: 'Deleted Successfully' } )
 * @Errors :
 * * ! Code 404 Not Found
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * DELETE * http://Address:Port/book/:ISBN
 * * * Params : ISBN
 * * * Query : Null
 * * * Body : Null
 * @Examples :
 * * http://localhost:7000/book/ISBN123
 * * * Params : ISBN123
 * * * Query : Null
 * * * Body : Null
 */
router.delete('/:ISBN', validateParamsBook, bookController.deleteByISBN);

/************
 * @Exports *
 ************/

//Express Router
module.exports = router;
