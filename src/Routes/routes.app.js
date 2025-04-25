
import { Router } from "express";
import getUser from "../Controllers/getUser.js";
import googleAuthController from "../../src/Middleware/auth.js"
import verifyJwt from "../Middleware/jwtverfier.js";
import getProducts from "../Controllers/getProducts.js"
import getUserbyId from "../Controllers/getUserwithId.js"
// import { getProducts } from "../Controllers/getProducts.js";
const router=Router();

router.post("/auth/google", googleAuthController);
router.get("/users", verifyJwt, getUser);
router.get("/userById", verifyJwt, getUserbyId);
router.get('/getProducts',verifyJwt, getProducts);

export {router}