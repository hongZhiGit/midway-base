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
  overrideDefault: true,
  // sequelize
  sequelize: {
    dialect: 'mysql',
    host: '152.136.16.132',
    port: '6606',
    database: 'advokate_earn_dev',
    username: 'root',
    password: 'Admin@123',
    timezone: '+08:00'
  }
};
