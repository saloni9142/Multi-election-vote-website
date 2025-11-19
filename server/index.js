const express = require("express")
const cors = require("cors")
const {connect} = require("mongoose")
require("dotenv").config()
const uploads = require("express-fileupload")
const cloudinary = require("./utils/cloudinary")

const Routes = require("./routes/Routes")
const {notFound, errorHandler} = require("./middleware/errorMiddleware")

const app = express()

app.use(express.json({extended:true}))

app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: ["http://localhost:3000"]}))
app.use(uploads()) 
app.use('/api', Routes)

// Error handlers 
app.use(notFound)
app.use(errorHandler)

// DB connection with improved options and error handling


connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(process.env.PORT, () => 
            console.log(`Server started on port ${process.env.PORT}`)
        )
    })
    .catch(err => {
        console.error('MongoDB connection error:', err)
        })

