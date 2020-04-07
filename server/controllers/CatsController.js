import express from "express"

let FAKEDB = [
  { id: 1, name: "Fluffy", description: "It is a cat" }
]

export default class CatController {
  constructor() {
    this.router = express.Router()
      //NOTE this is already at localhost:3000/api/cats from inside of main.js
      .get('', this.getAll)
      .get('/:catId', this.getOne)
      .post('', this.create)
      .delete('/:catId', this.delete)
      .use(this.defaultError)

  }

  defaultError(req, res, next) {
    res.status(404).send("Route not found in the cat controller")
  }

  create(req, res, next) {
    let newCat = {
      id: FAKEDB.length + 1,
      name: req.body.name || "Unknown Cat",
      description: req.body.description || "It is unknown"
    }
    FAKEDB.push(newCat)
    res.send({ message: "Successfully created data!", data: newCat })
  }

  delete(req, res, next) {
    let index = FAKEDB.findIndex(cat => cat.id == req.params.catId)
    if (index == -1) {
      return res.status(400).send("Invalid ID")
    }
    FAKEDB.splice(index, 1)
    res.send("DELORTED")
  }

  getAll(req, res, next) {
    res.send(FAKEDB)
  }

  getOne(req, res, next) {
    let foundCat = FAKEDB.find(cat => cat.id == req.params.catId)
    if (!foundCat) {
      return res.status(400).send("Invalid ID")
    }
    res.send(foundCat)
  }

}