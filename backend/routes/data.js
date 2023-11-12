const express = require("express")
const router = express.Router()


const { 
  postdata,
  postdataDriver
} = require("../controllers/dataController")


//login route

router.post("/", postdata) // to do a regular map

router.post("/driver", postdataDriver)



module.exports = router