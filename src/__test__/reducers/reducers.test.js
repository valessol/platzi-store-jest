/* eslint-disable indent */
import reducer from '../../reducers';
import ProductMock from '../../__mocks__/ProductMock';

describe('Reducers', () => {
    test('Retornar initial state', () => {
        expect(reducer({}, '')).toEqual({});
    });
    test('ADD_TO_CART', () => {
        const initialstate = {
            cart: [],
        };
        const payload = ProductMock;
        const action = {
            type: 'ADD_TO_CART',
            payload,
        };
        const expected = {
            cart: [
                ProductMock,
            ],
        };
        expect(reducer(initialstate, action)).toEqual(expected);
    });
});
