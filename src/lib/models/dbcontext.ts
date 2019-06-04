import { provide, scope, ScopeEnum, config, init } from 'midway';
import { Sequelize } from 'sequelize-typescript';

interface ISequelizeConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: string;
  timezone: '+08:00';
  /**
   * 存储目录，项目目录后缀目录 ts\js
   */
  modelFile: string;
}

@scope(ScopeEnum.Singleton)
@provide('DBContext')
export class DBContext {
  static sequelize: Sequelize;

  @config('sequelize')
  config: ISequelizeConfig;

  @config('env')
  env: string;

  constructor(config: ISequelizeConfig, env: string) {
    this.config = config;
    this.env = env;
  }

  @init()
  async init() {
    await new Promise(resolve => {
      DBContext.sequelize = new Sequelize({
        dialect: 'mysql',
        host: this.config.host,
        timezone: this.config.timezone,
        port: this.config.port,
        database: this.config.database,
        username: this.config.username,
        password: this.config.password,
        storage: ':memory:',
        modelPaths: [__dirname + `/*.model.${this.config.modelFile}`],
        modelMatch: (filename, member) => {
          return (
            filename.substring(0, filename.indexOf('.model')).replace('-', '') +
              'model' ===
            member.toLowerCase()
          );
        },
        define: {
          timestamps: true,
          paranoid: true,
          charset: 'utf8',
          underscored: true
        }
      });
      return DBContext.sequelize
        .authenticate()
        .then(result => {
          console.log('DataBase Connection successfully!');
        })
        .catch(err => {
          throw new Error(`Unable to connect to the database:${err}`);
        });
    });
  }
}
