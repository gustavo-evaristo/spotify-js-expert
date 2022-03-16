import config from './config.js';
import Controller from './controller.js';

const controller = new Controller();

const { location, pages: { homeHtml, controllerHtml }, constants: { CONTENT_TYPE }} = config;

export const routes = async (request, response) => {
    const { method, url } = request;

    if (method === 'GET' && url === '/' ) {
        response.writeHead(302, {
            location: location.home
        }) 
        
        return response.end();
    }

    if (method === 'GET' && url === '/home' ) {
        const { stream } = await controller.getFileStream(homeHtml);

        return stream.pipe(response);
    }

    if (method === 'GET' && url === '/controller' ) {
        const { stream } = await controller.getFileStream(controllerHtml);

        return stream.pipe(response);
    }

    if (method === 'GET'){
        const { stream, type } = await controller.getFileStream(url);

        const contentType = CONTENT_TYPE[type];

        if (contentType) {
            response.writeHead(200, {
                'ContentType': CONTENT_TYPE[type]
            })
        }

        return stream.pipe(response);
    }   

    response.writeHead(404)
    return response.end();
};

const handleError = async (error, response) => {
    if (error.message.includes('ENOENT')) {
        console.log('asset no found', error);

        response.writeHead(404);

        return response.end();
    }

    console.log('caught error on API', error);

    response.writeHead(500);

    return response.end();
};


export const handler = async (request, response) => {
    return routes(request, response).catch(error => handleError(error, response));
};
