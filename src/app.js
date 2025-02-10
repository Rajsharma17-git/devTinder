
const express= require('express');

const app = express();

app.use((req, res) => {
   res.send("Hello from the server!");
});


app.listen(3005, () => {
    console.log("server is successfully listening on port 3005...");
});