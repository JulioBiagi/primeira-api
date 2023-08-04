import express, { response } from "express"

import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const routes = express.Router();

const users = []

routes.get("/", (request, response) => {
  return response.json(users)
});

routes.post("/", (request, response) => {
  const { name, email } = request.body

  if (!name || !email) {
    return response.status(400).json({ error: "Missing User information" })
  }

  const user = {
    id: uuidv4(), name, email
  }

  users.push(user)
  return response.json(user)
})

routes.put("/:id", (request, reponse) => {
  const { id } = request.params;
  const { name, email } = request.body;

  if (!id) {
    return response.status(400).json({ error: "Missing Parameter" })
  }

  if (!name || !email) {
    return response.status(400).json({ error: "Missing User information" })
  }

  if (!users.length) {
    return response.status(400).json({ error: "user not found" })
  }

  const user = users.find(user => user.id === id)


  if (!user) {
    return response.status(400).json({ error: "user not found" })
  }

  const updatedUser = {
    // spread operator OU (...) -> copia os valores de um objeto para outro 
    ...user,
    name,
    email
  }

  const userIndex = users.findIndex(user => user.id === id)
  users[userIndex] = updatedUser
  return reponse.json(updatedUser)

})

routes.delete("/:id", (request, response) => {
  const { id } = request.params;
  
  if (!id) {
    return response.status(400).json({ error: "Missing Parameter" })
  }

  const userIndex = users.findIndex(user => user.id === id)
  
  users.splice(userIndex, 1);
  
  return response.status(204).send()

})

export default routes;

/**
 * Get = Buscar informação 
 * Post = inserir ou criar " "
 * Put =  Atulializar uma informação
 * Delete = Deletar uma informação
 */