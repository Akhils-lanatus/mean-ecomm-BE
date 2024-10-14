import { Router } from 'express';
import * as brandController from '../controllers/brand.controller.js';
const router = Router();

router.get('/', brandController.getBrands);
router.get('/:id', brandController.getBrandById);
router.post('/', brandController.createBrand);
router.put('/:id', brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

export default router;