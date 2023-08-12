const express = require("express")
const fileupload = require("express-fileupload")

const config = require("../config")
const serviceRouter = require("./routers/service.router");
const feedbackRouter = require("./routers/feedback.router");
const contactRouter = require("./routers/contact.router");


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(process.cwd() + "/uploads_service"))
app.use(express.static(process.cwd() + "/uploads_feedback"))
app.use(fileupload())

app.use("/api", serviceRouter);
app.use("/api", feedbackRouter);
app.use("/api", contactRouter);


app.listen(config.port, () =>
{
    console.log(config.port);
});