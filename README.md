# Backend for Visualization of Distribution System App

This project provides a backend code for processing data from frontend and storing it in mongoDB database.

## Installation 

To set up the backend on your local development environment, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Set up the environment variables by creating a `.env` file in the root directory and adding the required variables (e.g. DATABASE_URL, JWT_SECRET).
4. Start the server by running `npm start` (or `nodemon app` ).

## Database Setup

To use a MongoDB Atlas database link in a Mongoose Node.js code, you can follow these steps:

1. First, you need to create a MongoDB Atlas account and set up a cluster.
2. In your code, import Mongoose and use the connect() method to connect to the MongoDB Atlas cluster. Pass the connection string as the first argument to the `connect()` method. Here's an example:

```
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.log('Error connecting to MongoDB Atlas:', error.message);
});

```

Replace `<username>` and `<password>` with your MongoDB Atlas credentials. Replace `<cluster-url>` with the URL of your MongoDB Atlas cluster. Replace `` with the name of your database.

4. Once you have connected to the MongoDB Atlas cluster, you can define your Mongoose schema and models and use them to interact with your data in the Atlas cluster.

## Security considerations

To ensure the security of the backend API, please keep the following considerations in mind:

1. Use HTTPS to encrypt communication between the client and server.
2. Hash and salt user passwords before storing them in the database.
3. Use JWT tokens with short expiration times to minimize the risk of token theft.

## Contact information
If you have any questions or issues with the Code, please contact the project maintainers at phone:`8800402403`(Harsh Arora) ,`8871853272`(Sanskar Gupta) , `9993646823`(Chirag Sethiya).