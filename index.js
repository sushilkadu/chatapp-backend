const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")

const app = express()

const appConfig = require("./config/app-config")

app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "GET", "POST", "DELETE", "PUT")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

app.use(cookieParser())
app.use(logger("combined"))

mongoose.Promise = global.Promise

mongoose.connect(appConfig.db_url, { useNewUrlParser: true })

const authRoute = require("./routes/authRoutes")
const postRoute = require("./routes/postRoutes")

app.use("/api", authRoute)
app.use("/api", postRoute)

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
