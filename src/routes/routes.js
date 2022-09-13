const express = require("express")
const passport = require("../auth/auth")
const rootPassport = require("passport")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    const user = req.user
    try {
      const body = { _id: user._id, email: user.email }
      const token = jwt.sign({ user: body }, "TOP_SECRET")
      return res.json({ token, user })
    } catch (error) {
      console.log("ERROR", error)
      return next(error)
    }
  }
)

// router.post(
//    "/login",
//    passport.authenticate("login", (err, user, info) => {

//    }),
//    async (req, res, next) => {
//      try {
//        if (err || !user) {
//          const error = new Error("An error occurred.")
//          return next(error)
//        }
//        req.login(user, { session: false }, async (error) => {
//          if (error) return next(error)
//          const body = { _id: user._id, email: user.email }
//          const token = jwt.sign({ user: body }, "TOP_SECRET")
//          return res.json({ token })
//        })
//      } catch (error) {
//        return next(error)
//      }
//    }
//  )
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    })
  }
)
module.exports = router
