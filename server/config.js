import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));

const root = join(currentDir, '../');
const audioDirectory = join(root, 'audio');
const publicDirectory = join(root, 'public');

export default {
  port: process.env.PORT || 3000,

  dir: {
    root,
    publicDirectory,
    audioDirectory,
    songsdirectory: join(audioDirectory, 'songs'),
    fxDirectory: join(audioDirectory, 'fx'),
  },

  pages: {
    homeHtml: 'home/index.html',
    controllerHtml: 'controller/index.html',
  },

  location: {
    home: '/home',
  },
};
