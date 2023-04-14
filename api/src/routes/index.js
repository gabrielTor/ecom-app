const { Router } = require('express');
const router = Router();
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')
const paymentController = require('../controllers/paymentController')

router.get('/categories', productController.getCategories)
router.get('/products', productController.getProducts)
router.get('/user/products', productController.getUserProducts)
router.get('/search', productController.searchProducts)
router.get('/info/:id', productController.getProductInfo)
router.post('/postProduct', productController.createProduct)
router.post('/cloudinary/delete', productController.deleteCloudImg)
router.post('/favorites', productController.favoriteProducts)

router.get('/users', userController.getUsers)
router.post('/registerOrLogin', userController.createUser)
router.put('/logout', userController.logout)
router.put('/updateUser', userController.updateUser)
router.put('/addFavor', userController.addToFavorites)

router.get('/getChats', chatController.getChats)
router.post('/chat', chatController.newChat)

router.post('mercado-pago', paymentController.mcPayment)

module.exports = router;