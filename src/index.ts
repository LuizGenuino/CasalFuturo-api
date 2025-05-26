import express from "express"
import sequelize from "./config/database"
import { ENV } from "./utils/env"
import { errorHandler } from "./utils/errorHandler"
import router from "./routes"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { morganMiddleware } from "./middlewares/morgan.middlware"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morganMiddleware)

app.use("/api/v1/", router);


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler.handleError(err, res)
})

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco!');
    // NÃO USAR MAIS sequelize.sync()
    app.listen(Number(ENV.PORT || "3000"), () => {
      console.log('Servidor rodando em http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco:', err);
  });