import server from './server.js';
import config from './config.js';

server.listen(config.port).on('listening', () => console.log(`server runnig at port ${config.port}`));
