### About

This is a Express.js server created to deliver API to Transearch. This is a basic server and as such anyone can follow through, but a bit of understanding on the following is neccessary to benefit the moset from this project:

1. Express.js The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs. Express does not force you to use any specific ORM or template engine. With support for over 14 template engines via Consolidate.js, you can quickly craft your perfect framework.

2. JavScript: JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. - [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)

3. MongoDB: MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License - [Mongo DB](https://docs.mongodb.com/)

- [A live preview of the client app](https://transearch.vercel.app/)

Usage
`npm i` || `npm install`

Update the .env file as follows
.env

    `
    MONGODB_URI="mongodb+srv://<user>:<pass>@cluster0.6yavq.mongodb.net/<db>?retryWrites=true&w=majority"

PORT = 5000
`

MongoDB
Open "config/keys.js" and add your MongoDB URI, local or Atlas
