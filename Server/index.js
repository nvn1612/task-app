const express = require('express');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');
const port = 8000;
const app = express();
app.use(express.json())
app.use(cors());
app.use('/api', require('./routes/taskRoutes'));
const options = {
  definition:{
      openapi: "3.0.0",
      info:{
          title: "NODEJS CRUD PRISMA TASK APP API",
          version: "2.0.0",
      },
      servers:[
          {
              url: "http://localhost:8000/"
          }
      ]
  },
  apis:["./routes/taskRoutes.js"]
}   
const spec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
  app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))