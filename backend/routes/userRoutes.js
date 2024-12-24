import express from 'express'
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'
import { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } from '../controllers/userController.js'

const app = express()

app.route('/').get(authenticateUser,authorizePermission('admin'),getAllUsers);

app.route('/showMe').get(authenticateUser,showCurrentUser)
app.route('/updateUser').patch(updateUser)
app.route('/updateUserPassword').patch(authenticateUser,updateUserPassword)

app.route('/:id').get(authenticateUser,getSingleUser);  // should be placed last

export default app