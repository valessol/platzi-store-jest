/* eslint-disable indent */
// eslint-disable-next-line quotes
import getData from "../../utils/getData";

describe('Fetch API', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    test.only('Llamar una API y retornar datos', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
        getData('https://google.com')
            .then((response) => {
                expect(response.data).toEqual('12345');
            });
            // garantizar que la llamada a google este siendo ejecutada
         expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
    });
});
