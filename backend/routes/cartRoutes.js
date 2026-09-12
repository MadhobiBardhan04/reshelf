import checkToken from "../middlewares/checkToken";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controller/cartController.js";

router.get("/", checkToken, getCart);
router.post("/", checkToken, addToCart);
router.delete("/:productId", checkToken, removeFromCart);
