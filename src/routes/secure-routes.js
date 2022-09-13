const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.get("/profile", (req, res, next) => {
  console.log('here')
  const { user } = req

  const body = { _id: user._id, email: user.email }

  const token = jwt.sign({ user: body }, "TOP_SECRET")
  try {
    res.json({
      message: "You made it to the secure route",
      user,
      token,
    })
    
  } catch (error) {
    console.log('error', error)
  }
})
module.exports = router
