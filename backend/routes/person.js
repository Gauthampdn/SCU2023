const express = require("express")
const router = express.Router()

const { 
  
  createPerson,
  getPerson,
  getPersons,
  deletePerson,
  updatePerson

} = require("../controllers/personController")

const requireAuth = require("../middleware/requireAuth")

router.use(requireAuth) // requires authentication and then calls next. if no authentication then it throws an error

// to GET all persons
router.get("/", getPersons)

// to GET a single person
router.get("/:id", getPerson)

// POST a person
router.post("/", createPerson)

// DELETE a person
router.delete("/:id", deletePerson)

// UPDATE a person
router.patch("/:id", updatePerson)




module.exports = router