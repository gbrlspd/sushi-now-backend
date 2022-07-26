import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoriesController } from './controllers/category/ListCategoriesController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { CloseOrderController } from './controllers/order/CloseOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { DeleteItemController } from './controllers/order/DeleteItemController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

router.post('/users', new CreateUserController().handle);
router.post('/auth', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

router.post('/categories', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoriesController().handle);

router.post('/products', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/products', isAuthenticated, new ListByCategoryController().handle);

router.post('/orders', isAuthenticated, new CreateOrderController().handle);
router.delete('/orders', isAuthenticated, new DeleteOrderController().handle);
router.put('/orders', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.post('/orders/item', isAuthenticated, new AddItemController().handle);
router.delete('/orders/item', isAuthenticated, new DeleteItemController().handle);
router.get('/order', isAuthenticated, new DetailOrderController().handle);
router.put('/order', isAuthenticated, new CloseOrderController().handle);

export { router };