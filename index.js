import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import KaryawanRoutes from "./routes/KaryawanRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import db from "./config/Database.js";


const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(KaryawanRoutes);
app.use(UserRoutes);
app.use(AuthRoutes);

//store.sync();

app.listen(5000, ()=> console.log('Server Up and Running...')); 