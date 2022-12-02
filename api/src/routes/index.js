const { Router } = require('express');
const router = Router();
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')

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

module.exports = router;