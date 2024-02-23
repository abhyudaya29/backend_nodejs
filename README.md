const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const jwtPassword = '123456'; // Make sure to use a secure secret for JWT
app.use(express.json());

const ALL_USERS = [
  {
    username: "Abhyudaya",
    password: 1234,
    name: "Abhyudaya dubey"
  },
  {
    username: "yoyo29",
    password: 12345,
    name: "Dev dubey"
  },
];

const userExists = (username, password) => {
  let exists = false;
  for (let i = 0; i < ALL_USERS.length; i++) {
    console.log("Checking:", ALL_USERS[i].username, ALL_USERS[i].password);
    if (ALL_USERS[i].username === username && ALL_USERS[i].password === password) {
      exists = true;
      break;
    }
  }
  console.log("User exists:", exists);
  return exists;
}


app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password=req.body.password
  if (!userExists(username, password)) {
    return res.status(403).json({
      message: "User doesn't exist or invalid credentials"
    });
  }
  const token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token
  });
});
app.get('/users',(req,res)=>{
  const token=req.headers.authorization;
  const decode=jwt.verify(token,jwtPassword);
  const username=decode.username;
  res.json({
    users:ALL_USERS.filter((otherusers)=>{
      if(otherusers.username==username){
        return false;
      }else{
        return true;
      }
    })
  })
})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
