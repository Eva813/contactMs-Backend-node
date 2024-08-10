import express from "express";
import { Register, Login, Auth } from "../controller/userController.js";
// 這個檔案定義了一個 POST 路由 /register，當有請求到這個路由時，會調用 Register 
const router = express.Router();
import { body } from "express-validator"; 
import { VerifyUser } from "../middleware/VerifyUser.js";
import { createContact, getContacts, getContactById, updateContact, deleteContact } from "../controller/contactController.js";

// user route
router.post("/register",[
    //驗證邏輯放置在路由文件中是一種常見的做法，這樣可以使代碼更加模組化，並且可以更容易地重用代碼。
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email is not valid"),
    body("password").trim().notEmpty().withMessage("Password is required")
    .isLength({ min: 5, max:15 }).withMessage("Password must be at least 5 characters to 15 ")
], Register); // 當收到 POST 請求到 /register 時，調用 Register 函數

router.post("/login",[
    body("email").trim().notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email is not valid"),
    body("password").trim().notEmpty().withMessage("Password is required")
    .isLength({ min: 5, max:15 }).withMessage("Password must be at least 5 characters to 15 ")
], Login);

router.get("/verify", VerifyUser , Auth);

// contact route
// 需要先 verify user , 如果有驗證通過，才能新增聯絡人
router.post("/add-contact", VerifyUser, createContact);
router.get("/contacts", VerifyUser, getContacts);
router.get("/contact/:id", VerifyUser, getContactById);
router.put("/update-contact/:id", VerifyUser, updateContact);
router.delete("/contact/:id", VerifyUser, deleteContact);


export { router as Router}
