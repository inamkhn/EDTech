import express from 'express'
import { getallcourses,getCoursesLectures,addLecture,deleteCourse,deleteLecture } from '../controllers/courseController.js'
import { createcourse } from '../controllers/courseController.js'
import singleUpload from '../middlewares/multer.js'
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js'
const router = express.Router()


router.route('/allcourses').get(getallcourses)
router.route('/createcourse').post(singleUpload,createcourse)  
router.route('/course/:id').get(getCoursesLectures)
.post(singleUpload,addLecture).delete(singleUpload,deleteCourse) //isAuthenticated,authorizeAdmin,

router.route("/lecture").delete(deleteLecture)  //isAuthenticated, authorizeAdmin,


export default router
