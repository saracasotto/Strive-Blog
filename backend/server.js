import express from "express";

const server = express();
const port = 3000


server.get('/authors', (request, response) => {
    response.send('ciao belli')
})

server.get('/authors/:id', (request, response) =>{
    const id = request.params.id
    //const { id } = request.params
    response.send(`Qui andranno i dati con id ${id}`)
})

server.post('authors', (request, response) => {
    response.send(request.body)
    //ricevo un json
})

server.listen(port, () => {
    console.log(`Server is running at port ${port}`)
}) //server in ascolto alla porta 300

//IMPORTANTE! RIAVVIA SERVER A OGNI MODIFICA