const express = require("express")
const cors = require("cors")
const {connect} = require("mongoose")
require("dotenv").config()
const fileupload = require("express-fileupload")

const Routes = require("./routes/Routes")
const {notFound, errorHandler} = require("./middleware/errorMiddleware")

const app = express()
app.use(cors({credentials: true, origin: ["http://localhost:3000"]}))



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(fileupload()) 

app.use('/api', Routes)

// Error handlers 
app.use(notFound)
app.use(errorHandler)

// DB connection
connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => 
            console.log(`Server started on port ${process.env.PORT}`)
        )
    })
    .catch(err => console.log(err))