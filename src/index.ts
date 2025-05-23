import express from "express"
import sequelize from "./config/database"
import { ENV } from "./utils/env"
import { errorHandler } from "./utils/errorHandler"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler.handleError(err, res)
})

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao banco!');
    // NÃO USAR MAIS sequelize.sync()
    app.listen(Number(ENV.PORT || "3000"), () => {
      console.log('🚀 Servidor rodando em http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco:', err);
  });