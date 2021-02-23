// All this information is not used but left here if needed later, to connect to a MongoDB

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const commitsRouter = require('./routes/commits');

// app.use('/commits', commitsRouter);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });