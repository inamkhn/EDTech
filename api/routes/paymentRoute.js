import express from 'express'
import { Subscribe} from '../controllers/paymentController.js'
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js'
const router = express.Router()


router.route('/subscribe').get(Subscribe)



export default router