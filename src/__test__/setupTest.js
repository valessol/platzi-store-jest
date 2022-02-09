import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Añadir en package.json la configuración de "jest" en donde le indicaremos dónde debe buscar este archivo

// Configuración para el test de fetch

global.fetch = require('jest-fetch-mock');
