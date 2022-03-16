import config from './config.js';
import Controller from './controller.js';

const controller = new Controller();

const { location, pages: { homeHtml, controllerHtml } } = config;

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

    return response.end('hello');
};

export const handler = (request, response) => {
    return routes(request, response).catch(err => console.log(err))
};
