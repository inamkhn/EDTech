import express from 'express'
import { getallusers,updateprofilepicture } from '../controllers/userController.js'
import { createuser,login,logout,getMyProfile,
changePassword,updateProfile,addToPlaylist,forgetPassword,resetpassword,getAllUsers,updateUserRole,
deleteUser,removeFromPlaylist } from '../controllers/userController.js'
import { isAuthenticated,authorizeAdmin } from '../middlewares/auth.js'
import singleUpload from '../middlewares/multer.js'


const router = express.Router()

router.route('/users').get(getallusers)
router.route('/register').post(singleUpload,createuser)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticated,getMyProfile)
router.route('/changepassword').put(isAuthenticated,changePassword)
router.route('/updateprofile').post(isAuthenticated,updateProfile)
router.route("/updateprofilepicture").put(isAuthenticated,singleUpload,updateprofilepicture);
// ForgetPassword
router.route("/forgetpassword").post(forgetPassword)

router.route("/addToPlaylist/:id").post(isAuthenticated,addToPlaylist)
router.route("/removeFromPlaylist/:id").post(removeFromPlaylist)
// ResetPassword
router.route("/resetpassword/:token").put(resetpassword);

//admin
router.route("/admin/users").get(getAllUsers); //isAuthenticated, authorizeAdmin,
router.route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(deleteUser); //isAuthenticated, authorizeAdmin,

export default router