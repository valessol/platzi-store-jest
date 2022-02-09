/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
//probar render con el provider mock
//ver si esta bien el titulo
import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/ProviderMock';
import Header from '../../components/Header';

//shallow permite probar componentes como una unidad, sin tener que traer todo el DOM

describe('<Header />', () => {
    test('Render del componente Header', () => {
        const header = shallow(
            <ProviderMock>
                <Header />
            </ProviderMock>,
        );
        expect(header.length).toEqual(1);
    });
    test('Render del título', () => {
        const header = mount(
            <ProviderMock>
                <Header />
            </ProviderMock>,
        );
        expect(header.find('.Header-title').text()).toEqual('Platzi Store');
    });
});

describe('Header Snapshop', () => {
    test('Comprobar snapshot de Header', () => {
        const header = create(
            <ProviderMock>
                <Header />
            </ProviderMock>,
        );
        expect(header.toJSON()).toMatchSnapshot();
    });
});
