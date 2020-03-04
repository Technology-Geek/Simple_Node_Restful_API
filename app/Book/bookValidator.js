/*****************
 * @Dependencies *
 *****************/

//Request Validator
const { param, body } = require('express-validator');
//Validator Error Handler
const validatorErrorHandler = require('../middleware/validation/validatationErrorHandler');

/**
 * ISBN Validator
 *
 * @Validate Param
 * @Errors :
 * * ! isExists Missing
 * * ! isEmpty Empty
 */
const validateParamsISBN = param('ISBN')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty');

/**
 * ISBN Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists Missing
 * * ! isEmpty Empty
 */
const validateBodyISBN = body('ISBN')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty');

/**
 * Title Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists Missing
 * * ! isEmpty Empty
 */
const validateBodyTitle = body('title')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty');

/**
 * Description Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists Missing
 * * ! isEmpty Empty
 */
const validateBodyDescription = body('description')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty');

/**
 * Publish Year Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists Missing
 * * ! isEmpty Empty
 * * ! isInt Integers Only
 */
const validateBodyPublishYear = body('publishYear')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty')
  .isInt()
  .withMessage('Integers Only');

/**
 * ISBN Validator
 *
 * @Validate Body
 * @Optional
 * @Errors :
 * * ! isEmpty Empty
 */
const validateBodyOptionalISBN = body('ISBN')
  .optional()
  .not()
  .isEmpty()
  .withMessage('Empty');

/**
 * Title Validator
 *
 * @Validate Body
 * @Optional
 * @Errors :
 * * ! isEmpty Empty
 */
const validateBodyOptionalTitle = body('title')
  .optional()
  .not()
  .isEmpty()
  .withMessage('Empty');

/**
 * Description Validator
 *
 * @Validate Body
 * @Optional
 * @Errors :
 * * ! isEmpty Empty
 */
const validateBodyOptionalDescription = body('description')
  .optional()
  .not()
  .isEmpty()
  .withMessage('Empty');

/**
 * Publish Year Validator
 *
 * @Validate Body
 * @Optional
 * @Errors :
 * * ! isEmpty Empty
 * * ! isInt Integers Only
 */
const validateBodyOptionalPublishYear = body('publishYear')
  .optional()
  .not()
  .isEmpty()
  .withMessage('Empty')
  .isInt()
  .withMessage('Integers Only');

/********************
 * @ValidatorChains *
 ********************/

//Book Param Chain
const validateParamsBook = [validateParamsISBN, validatorErrorHandler];

//Book Body Chain
const validateBodyBook = [
  validateBodyISBN,
  validateBodyTitle,
  validateBodyDescription,
  validateBodyPublishYear,
  validatorErrorHandler
];

//Book Body Optional Chain
const validateBodyOptionalBook = [
  validateBodyOptionalISBN,
  validateBodyOptionalTitle,
  validateBodyOptionalDescription,
  validateBodyOptionalPublishYear,
  validatorErrorHandler
];

/************
 * @Exports *
 ************/

module.exports = {
  //Book Param Chain
  validateParamsBook,
  //Book Body Chain
  validateBodyBook,
  //Book Body Optional Chain
  validateBodyOptionalBook
};
