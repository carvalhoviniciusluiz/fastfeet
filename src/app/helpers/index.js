import url from 'url';

const Helper = {};

Helper.prettyHost = () => {
  const formatUrl = () =>
    url.format({
      protocol: process.env.PROTOCOL || 'http',
      hostname: process.env.HOST || '127.0.0.1',
      port: process.env.PORT || 3333,
      pathname: '',
    });

  return formatUrl();
};

export default Helper;
