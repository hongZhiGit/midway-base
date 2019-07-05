export const development = {
  watchDirs: [
    'app',
    'lib',
    'service',
    'config',
    'app.ts',
    'agent.ts',
    'interface.ts'
  ],
  overrideDefault: true
};

export const sequelize = {
  dialect: 'mysql',
  host: '153.136.16.133',
  port: '3303',
  database: 'dev',
  username: 'root',
  password: 'Admin@333',
  timezone: '+08:00',
  modelFile: 'ts',
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: (field: any, next: () => void) => {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    }
  }
};

// cluster
export const cluster = {
  listen: {
    path: '',
    port: 8090,
    hostname: 'localhost'
    // hostname: '192.168.0.103',
  }
};

/**
 * 微信api
 */
export const wxapi = {
  path: 'http://localhost:8090',
  token: 'ujmik,123'
};

export const cache = {
  default: 'memory',
  stores: {
    memory: {
      driver: 'memory',
      max: 100,
      ttl: 0
    }
  }
};
