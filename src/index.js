require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("./auth/auth")
const json = bodyParser.json()

const app = express()
const PORT = 5000

const routes = require("./routes/routes")
const secureRoute = require("./routes/secure-routes")

app.use(express.json())

app.use("/", routes)
app.use("/user", passport.authenticate("jwt", { session: false, failWithError: true }), secureRoute)

app.use(function (err, req, res, next) {
  console.log("ERROR" ,err)
  res.status(err.status || 500)
  res.json({ error: err })
})

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    await app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
  } catch (e) {
    console.log(e)
  }
}

start()
