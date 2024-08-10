import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './config/db.js';
import { Router } from './routes/routes.js';

// 從名為 config.env 的文件中加載環境變數到 process.env 中。這個文件通常包含敏感信息，例如 API 金鑰、數據庫 URL , port 等。
dotenv.config({ path: './config.env' })
// const allowedOrigins = process.env.CORS_ORIGIN.split(',');
// console.log(allowedOrigins);
const app = express();
app.use(express.json());

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
const allowedOrigins = ['https://contact-ms-fronted-react.vercel.app', 'http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Handle OPTIONS preflight request
app.options('*', cors());
// app.use(cors({
//   origin: ['https://contact-ms-fronted-react.vercel.app', 'http://localhost:5173'],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


//  Express 中的一個方法，用來將Middleware綁定到應用程序
// '/contactmsyt': 這是基礎路徑（base route）。
app.use('/contactmsyt', Router);

app.listen(process.env.PORT , () => console.log('Server is running on port 3000'))
