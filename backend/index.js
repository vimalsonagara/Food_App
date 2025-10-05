const express = require('express')
const cors = require("cors");
const mongodb=require("./db")
require('dotenv').config(); 

const app = express()
const port = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

mongodb();

app.use(cors({ origin: CLIENT_URL }));
// app.use((req,res,next)=>
// {
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:XXXX");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With,  Content-Type, Accept"
//   );
//   next();
// }) <-- in place of cors


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/Displaydata"));
app.use('/api',require("./Routes/OrderData"));  
app.use('/api',require("./Routes/MyProfile"));

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})