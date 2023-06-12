import { Router } from "express";
import {
  getProducts,
  saveProduct,
  updateLikes,
  getProduct,
  deleteProduct,
  updateProduct,
  addComments,
  getProductsSort,
  filterProductsByCategories,
  editProduct,
} from "../controllers/products.js";
import auth from "../config/middleware.js";

const router = Router();

router.post("/:id/like", auth, updateLikes);

router.post("/:productId/comments", auth, addComments);

router.get("/", getProducts);

router.get("/sort", getProductsSort);

router.get("/filterByCategories/:category", filterProductsByCategories);

router.post("/save", auth, saveProduct);

router.put("/edit", auth, editProduct);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
