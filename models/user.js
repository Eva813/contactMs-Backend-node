import mongoose from "mongoose";
// 定義了數據庫模式和模型。用來與數據庫進行交互的，例如保存、查詢數據等。
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const UserModel = mongoose.model("user", UserSchema);
export { UserModel };
