import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './config/db.js';
import { Router } from './routes/routes.js';

const app = express();
app.use(express.json());
app.use(cors());
// 從名為 config.env 的文件中加載環境變數到 process.env 中。這個文件通常包含敏感信息，例如 API 金鑰、數據庫 URL , port 等。
dotenv.config({ path: './config.env' })

//  Express 中的一個方法，用來將Middleware綁定到應用程序
// '/contactmsyt': 這是基礎路徑（base route）。
app.use('/contactmsyt', Router);

app.listen(process.env.PORT , () => console.log('Server is running on port 3000'))
