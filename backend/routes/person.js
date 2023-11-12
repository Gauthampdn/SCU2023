const express = require("express")
const router = express.Router()

const { 
  
  createPerson,
  getPerson,
  getPersons,
  deletePerson,
  updatePerson,
  getPassengers,
  getDrivers,
  getDriverName

} = require("../controllers/personController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth) // requires authentication and then calls next. if no authentication then it throws an error

// to GET all persons
router.get("/", getPersons)

router.get("/passengers", getPassengers)

router.get("/drivers", getDrivers)

// to GET a single person
router.get("/:id", getPerson)

// POST a person
router.post("/", createPerson)

// DELETE a person
router.delete("/:id", deletePerson)

// UPDATE a person
router.patch("/:id", updatePerson)

router.get("/driver/:id", getDriverName)





module.exports = router