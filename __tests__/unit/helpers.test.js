import Helper from '../../src/app/helpers';

it('Should retur valid url', () => {
  const url = Helper.prettyHost();

  expect(url).toEqual('http://127.0.0.1:3333');
});
