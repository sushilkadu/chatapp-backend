const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const app = express()

const appConfig = require("./config/app-config")

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

app.use(cookieParser())
app.use(logger("combined"))

mongoose.Promise = global.Promise

mongoose.connect(appConfig.db_url, { useNewUrlParser: true })

const authRoute = require("./routes/authRoutes")

app.use("/api", authRoute)

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
