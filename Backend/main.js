import express  from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
// facilidad de usar json
app.use(bodyParser.json());// para datos JSON
app.use(bodyParser.urlencoded({extended: true}));//para datos de formularios

//regula las solicitudes de un dominio diferente al servidor en el que se encuentra la app
app.use(cors());


const port = process.env.MI_PUERTO || 5000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})