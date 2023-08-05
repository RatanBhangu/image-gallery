import { join } from "path";

export default {
    baseUrl: process.env.BASE_URI || 'https://localhost:3000',
    JWT_SECRET: "eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJCRkciLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MjUzOTA2MDY1MSwiaWF0IjoxNjU1NDQ3ODUxfQ",

    //TTL for Password token in seconds
    PASSWORD_TOKEN_EXPIRY: 3600,
    // Email
    EMAIL_HOST: "smtp.gmail.com",
    EMAIL_PORT: 587,
    EMAIL_SECURE: false,
    EMAIL_USERNAME: "Support",
    EMAIL_FROM: "",
    EMAIL_PASSWORD: "",
    // Database
    MONGOURI:"mongodb+srv://ratandhillon001:Vdr4TRvvcVqFWb5X@cluster0.3x3dcc7.mongodb.net/image-galary",
    GET_FILE_EXTENSION: /\.[a-z\-\d_\+]+$/gi,
    OTHER_ASSET: join(process.cwd(), 'assets'),
}