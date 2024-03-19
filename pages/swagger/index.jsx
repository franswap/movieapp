import Head from 'next/head';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger = () => {
    return (
        <div>
            <Head>
                <title>Documentation API MovieApp</title>
                <meta name="description" content="Documentation de l'api MOVIEAPP connecté à une database de film de MongoDB" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <SwaggerUI url="/api/doc" />
        </div>
    );
};

export default Swagger;