
const express= require('express');

const app = express();

//app.use("/" ,(req, res) => {
  // res.send("Hello from the server!");
//});

app.get("/user",(req, res) => {
    res.send({ firstname:"Raj" });
 });

 app.use("/test",(req, res) => {
    res.send("Hello Raj!");
 });


app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});