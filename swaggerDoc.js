const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Shopify Interview Images Microservice',
            version: '0.0',
            description: 'Shopify Interview Images API',
        },
        basePath: "/"
    },
    apis: ['src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/images/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.get('/images/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
}