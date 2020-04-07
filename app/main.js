import express from "express"
import bp from "body-parser"
let server = express()
let port = 3000

server.use(bp.json())

server.get('/', (req, res, next) => {
  res.send("hello world")
})

server.listen(port, () => {
  console.log("server is running on port ", port);

})