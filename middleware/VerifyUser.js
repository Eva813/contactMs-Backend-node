import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });
// Middleware 負責處理請求的預處理邏輯，如身份驗證、日誌記錄、錯誤處理等。這樣可以讓路由和控制器只關注於業務邏輯和請求處理
// 確保所有請求在進入控制器之前都經過相同的處理流程，從而提高應用程序的穩定性和一致性。
export const VerifyUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    // 檢查 token 是否存在
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      try {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        }
        const userFromDB = await UserModel.findById(user.id).select(
          "-password"
        );
        // UserModel.findByOne({ _id: user.id }).select('-password');
        req.user = userFromDB;
        next();
      } catch (err) {
        console.log(err);
        // server side error
        return res.status(500).json({ error: err.message });
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden, token not found" });
  }
};
