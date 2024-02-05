import express from 'express'
import { createConverstion,userConverstion,usersConverstion } from '../controllers/conversationController.js'

const router = express.Router()

router.route('/createConversation').post(createConverstion)
router.route('/getConversation/:id').get(userConverstion)
router.route('/getConversation/:firstuser/:secondUser').get(usersConverstion)

export default router