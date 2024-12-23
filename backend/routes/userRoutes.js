import express from 'express'
import {authenticateUser} from '../middleware/authentication.js'
import { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } from '../controllers/userController.js'

const app = express()

app.route('/').get(authenticateUser,getAllUsers);

app.route('/showMe').get(showCurrentUser)
app.route('/updateUser').patch(updateUser)
app.route('/updateUserPassword').patch(updateUserPassword)

app.route('/:id').get(authenticateUser,getSingleUser);  // should be placed last

export default app