import express, { response } from "express"

const app = express()

app.get("/test", (request, response) => {
    return response.send("Olá NLW - Método GET")
})

app.post("/test-post", (request, response) => {
    return response.send("Olá NLW - Método POST")
})

app.listen(3000, () => console.log("Server is running on port 3000"))