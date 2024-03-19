import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger(
    {
        openApiVersion: '3.0.0',
        title: 'Documentation de l\'API MovieApp',
        version: '1.1.2',
        apiFolder: 'pages/api',
        swaggerOptions: {
            docExpansion: 'list',
            displayRequestDuration: true
        },
    }
);

export default swaggerHandler();
