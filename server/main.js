import express from "express"
import bp from "body-parser"
let server = express()
const port = 3000

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())
import CatController from "./controllers/CatsController"
let catController = new CatController()

server.use('/api/cats', catController.router)

server.get('/', (req, res, next) => {
  res.send("hello world")
})

server.get('/error', (req, res, next) => {
  return next("Error")
})

//NOTE Default error handler and route
server.use((req, res, next) => {
  res.status(404).send("Route not Found")
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(400).send(err)

})

server.listen(port, () => {
  console.log("server is running on port ", port);

})