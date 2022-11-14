const { Router } = require('express');
const router = Router();
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')

router.get('/categories', productController.getCategories)
router.get('/users', userController.getUsers)
router.post('/registerOrLogin', userController.createUser)
router.put('/logout', userController.logout)

module.exports = router;