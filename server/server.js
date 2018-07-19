const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const port = process.env.PORT || 3000;


var app = express();
app.use(express.static(publicPath));//for static middleware

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});