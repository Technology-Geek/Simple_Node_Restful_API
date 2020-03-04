# Simple Node Restful API

A CRUD Restful API using the NodeJs , ExpressJs and MongoDB -> Mongoose.

## Setup

Create **.env** file with your configuration keys to "configuration/.env" like **.env.example**

```bash
httpPort=<Port Number>
mongoURI='<MongoDB Connection String>'
mongoDBName='<Your DB Name>'
```

## Install Dependencies

```bash
npm install
```

## Quick Start

```bash
# production mode
$ npm start

# development mode
$ npm run dev
```

## End Points Examples

- Get All Books

  GET `/book`

- Get Book by ISBN

  GET `/book/:ISBN`

- Add Book

  POST `/book`

  ```json
  Body
  {
  "ISBN" : "isbn" ,
  "title" : "book title" ,
  "description" : "book description" ,
  "publishYear" : 2000
  }
  ```

- Edit Book

  PUT `/book/:ISBN`

  ```json
  Body
  {
  "title" : "new book title"
  }
  ```

- Delete Book

  DELETE `/book/:ISBN`

## App Info

### Author

[Technology-Geek](https://github.com/Technology-Geek)

### Version

1.0.0

### License

This project is licensed under the **MIT License**
