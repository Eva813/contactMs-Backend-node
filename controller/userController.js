import express from "express";
import { UserModel } from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: '../config/.env' })
// 這個檔案中的 Register 函數是用來處理 /register 路由請求的控制。在這個示例中，它只是打印了一條訊息，實際應用中應該會包含更多邏輯，例如保存用戶數據到數據庫。
const Register = async (req, res) => {
  // ?
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    // 檢查用戶是否已經存在 (email 是否已經被使用)
    const userExists = await UserModel.findOne({ email });
    if(userExists) {
      return res.status(400).json({
        errors: [{ msg: "User Already Exists" }]
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword
    });
    const result = await newUser.save();
    // 移除密碼欄位
    result._doc.password = undefined;
    // 返回新用戶數據
    return res.status(200).json({success: true, ...result._doc});
  } catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message  });
  }
}
// result._doc 是 Mongoose 中的一個屬性
// console.log(result);         // 顯示包含 mongoose 特定屬性的文檔對象
// console.log(result._doc);    // 顯示原始的文檔數據

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    // 檢查用戶是否已經存在 (email 是否已經被使用)
    const userExists = await UserModel.findOne({ email });
    if(!userExists) {
      return res.status(400).json({
        errors: [{ msg: "User Not Exists" }]
      });
    }
    const isPasswordRight = await bcrypt.compare(password, userExists.password);
    if(!isPasswordRight) {
      return res.status(400).json({
        errors: [{ msg: "Password is not correct" }]
      });
    };
    // generate token
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    const user = {
      ...userExists._doc,
      password: undefined
    }
    // 返回新用戶數據
    return res.status(200).json({success: true, user, token});
  } catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message  });
  }
}

const Auth = (req, res) => {
  return res.status(200).json({ success: true, user: {...req.user._doc} });
}

export { Register, Login, Auth }

