const { default: mongoose } = require("mongoose")
const Person = require("../models/personModel")

// get all Persons

const getPersons = async (req, res) => {
  // Removed the user_id filter to get all Persons in the database
  const Persons = await Person.find().sort({ createdAt: -1 });

  res.status(200).json(Persons);
}


const getPassengers = async (req, res) => {

  // The key addition here is the type object condition in the query
  const passengers = await Person.find({ type: "passenger" }).sort({ createdAt: -1 });

  res.status(200).json(passengers);
};


const getDrivers = async (req, res) => {

  // The key addition here is the type object condition in the query
  const passengers = await Person.find({ type: "driver" }).sort({ createdAt: -1 });

  res.status(200).json(passengers);
};

const getDriverName = async (req, res) => {

  const {id} = req.params

  // The key addition here is the type object condition in the query
  const passengers = await Person.find({ looking: id }).sort({ createdAt: -1 });

  res.status(200).json(passengers);
};





// get a single Person

const getPerson = async (req, res) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Person and invalid ID"})
  }

  const Person = await Person.findById(id)

  if(!Person){
    return res.status(404).json({error: "No such Person"})
  }
  
  res.status(200).json(Person)
}


// create a new Person

const createPerson = async (req, res) => {
  const { title, description, image, icon, Person, convos } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!Person || Person.length === 0) {
    emptyFields.push("Person");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all fields", emptyFields });
  }

  // Adding document to DB
  try {
    const user_id = req.user.id;
    const newPerson = await Person.create({
      title,
      description,
      image,
      icon,
      Person,
      convos,
      user_id
    });

    res.status(200).json(newPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createPerson;


// delete a Person
const deletePerson = async (req, res) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Person and invalid ID"})
  }

  const Person = await Person.findByIdAndDelete(id)

  if(!Person){
    return res.status(404).json({error: "No such Person"})
  }

  res.status(200).json(Person)

}


const updatePerson = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Person and invalid ID"});
  }

  const existingPerson = await Person.findById(id);
  
  if(!existingPerson){
    return res.status(404).json({error: "No such Person"});
  }

  const updatedPersonData = {
    ...req.body
  };

  const updatedPerson = await Person.findByIdAndUpdate(id, updatedPersonData, { new: true });

  res.status(200).json(updatedPerson);
};




module.exports = {
  getPerson,
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
  getPassengers,
  getDrivers,
  getDriverName
}