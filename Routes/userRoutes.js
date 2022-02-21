const express=require('express')
const router= express.Router()
const userController=require('../controllers/userControllers')

router.get('/',userController.getUsers)
router.get('/:id',userController.getUserById)
router.post('/',userController.addUser)
router.delete('/:id',userController.deleteUser)
router.put('/:id',userController.updateUser)
module.exports=router;