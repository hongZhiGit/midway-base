import { provide, scope, ScopeEnum, config } from 'midway';
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

export interface IDBContext extends DBContext {}

@scope(ScopeEnum.Singleton)
@provide('DBContext')
export class DBContext {
  sequelize: Sequelize;

  @config('sequelize')
  config: ISequelizeConfig;

  @config('env')
  env: string;

  get Transaction() {
    return this.sequelize.transaction;
  }

  async init() {
    await new Promise(resolve => {
      this.sequelize = new Sequelize({
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
      return this.sequelize
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
