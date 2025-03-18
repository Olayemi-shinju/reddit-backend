const express = require('express');
const cors = require('cors');
const port = 4000;
const path = require('path')
const userRoute = require('./routes/UserRoutes')
const adminRoute = require('../backend/routes/AdminRoute')
const postRoute = require('../backend/routes/PostRoute')
const commentRoute = require('../backend/routes/CommentRoute')

const Db_Connection = require('./DB_Connection'); 
const app = express(); 
app.use(express.urlencoded({extended: true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
Db_Connection();
app.use(express.json());
app.use(cors());
app.use(adminRoute)
app.use(postRoute)
app.use(commentRoute)
app.use(userRoute)
// console.log(userRoute)
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Server Started Successfully on port ${port}`);
});
