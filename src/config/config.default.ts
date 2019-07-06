export = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558664005392_5443';

  // add your config here
  config.middleware = ['joiValidate'];

  // cluster
  config.cluster = {
    listen: {
      port: 8090,
      hostname: '0.0.0.0'
    }
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  return config;
};
