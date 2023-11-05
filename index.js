require('dotenv').config()
const express=require('express')
const app=express();

const books=[
    {
        id:1,
        Book_name:"Slicer"
    }
]
app.get('/',(req,res)=>{
    res.send("Hello Abhyudaya");

})

app.get('/home',(req,res)=>{
    res.send("Welcome to Home Page abhyudaya");
})
app.get('/books',(req,res)=>{
    res.json(books)
})
PORT=3000;
app.listen(process.env.PORT,()=>{
    console.log('started')
})