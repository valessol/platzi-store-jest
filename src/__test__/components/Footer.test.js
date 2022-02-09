/* eslint-disable indent */
import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Footer from '../../components/Footer';

// mount: permite montar un elemento sobre el DOM y realizar una búsqueda de ese elemento, o buscar items que pueda tener la presentación de ese componente

describe('<Footer />', () => {
    const footer = mount(<Footer />);

    test('Render del componente Footer', () => {
        expect(footer.length).toEqual(1);
    });

    test('Render del título', () => {
        expect(footer.find('.Footer-title').text()).toEqual('Platzi Store');
    });
});

describe('Footer Snapshot', () => {
    // para utilizar snapshot, debemos convertir el componente a un objeto json, y para ello instalamos la dependencia react-test-renderer --save-dev
    // Si se corre la version 17 de react o hay conflicto al instalar la dependencia, usar: npm i react-test-renderer@16.14.0 -D

    test('Comprobar la UI del componente Footer', () => {
        const footer = create(<Footer />);
        expect(footer.toJSON()).toMatchSnapshot();
        // Si el snapshot no existe al momento de ejecutar el test, lo crea. Cuando el test se vuelva a ejecutar, lo compara.
    });
});
