const express = require("express")
const router = express.Router()


const { 
  postdata
} = require("../controllers/dataController")


//login route

router.post("/", postdata)


module.exports = router