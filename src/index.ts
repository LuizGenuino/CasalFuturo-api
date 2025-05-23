import express from "express"
import sequelize from "./config/database"
import { ENV } from "./utils/env"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
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