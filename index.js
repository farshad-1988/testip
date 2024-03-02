import express from "express";
import os from "os"
import path from "path"



const app = express()
app.set('trust proxy', true) // will return real ip address even behind proxy


app.use("/static", express.static("public", { "maxage": "2h" }))

app.get('/', (req, res) => {
    let ip1 = req.headers['x-forwarded-for'] //if there is more than one ip address 
    //complete format --> req.headers['x-forwarded-for']?.split(',').shift()
    let ip2 = req.socket.remoteAddress
    res.header("Cache-Control", "public max-age=86400")
    res.header("Content-Type", "text/html")
    res.send(`<h1>req.headers['x-forwarded-for'] ${ip1} </h1><h1>req.socket.remoteAddress ${ip2}</h1>`);
})

app.listen(3000, () => {
    console.log("it runs")
})