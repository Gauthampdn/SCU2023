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

// to GET all templates
router.get("/", getPersons)

// to GET a single template
router.get("/:id", getPerson)

// POST a template
router.post("/", createPerson)

// DELETE a template
router.delete("/:id", deletePerson)

// UPDATE a template
router.patch("/:id", updatePerson)




module.exports = router