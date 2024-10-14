import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { multerErrorHandling } from "../utils/multer.errorHandler.js";
import { addProductController } from "../controllers/product.controller.js";

const router = Router();

router.post("/", upload.array("productImages", 3), multerErrorHandling, addProductController)

export default router;