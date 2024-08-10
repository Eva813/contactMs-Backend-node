import mongoose from "mongoose";
// 定義了數據庫模式和模型。用來與數據庫進行交互的，例如保存、查詢數據等。
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true
  },
  address: {
    type: String,
  },
  // 創建者
  // 引用 user 集合中的檔案
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB 的 _id 值
    ref: "user",
  },
});

//ObjectId 是一個特殊的類型，通常用於唯一標識文檔。當你定義一個 Mongoose schema 時，可以使用 mongoose.Schema.Types.ObjectId 來明確指定某個屬性是 ObjectId 類型。

// const mongoose = require('mongoose');

// const personSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   name: String,
//   age: Number,
// });

const ContactModel = mongoose.model("contact", ContactSchema);
export { ContactModel };

