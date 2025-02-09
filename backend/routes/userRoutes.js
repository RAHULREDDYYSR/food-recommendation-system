import express from 'express'
import {authenticateUser, authorizePermission} from '../middleware/authentication.js'
import { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } from '../controllers/userController.js'

const app = express()

app.route('/').get(authenticateUser,authorizePermission('admin'),getAllUsers);// for admin 

app.route('/showMe').get(authenticateUser,showCurrentUser) // to get current user details
app.route('/updateUser').patch(authenticateUser, updateUser) // update user
app.route('/updateUserPassword').patch(authenticateUser,updateUserPassword) // update user password by taking old and new password

app.route('/:id').get(authenticateUser,getSingleUser);  // should be placed last

export default app