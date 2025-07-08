import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Name',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: [
    './src/routes/*.js', // Load all paths from routes
    './src/models/*.js', // Load all components from models
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (path, app) => {
  app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwaggerDocs
