import url from 'url';

const {
  PROTOCOL: { protocol = 'http' },
  HOST: { host = 'localhost' },
  PORT: { port = 3333 },
} = process.env;

const Helper = {};

Helper.prettyHost = () => {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '',
    });

  return formatUrl(host);
};

export default Helper;
