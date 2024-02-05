import express from 'express'
import { createChat,chatId } from '../controllers/messageController.js'

const router = express.Router()

router.route('/createChat').post(createChat)
router.route('/getChat/:id').get(chatId)


export default router