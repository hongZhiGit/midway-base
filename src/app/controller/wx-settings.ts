import { provide, Context, inject } from 'midway';
import { IWxSettingsService } from '../../lib/services/wx-settings';
import { BaseController } from '../../base/base.controller';
import {
  SwaggerJoiController as sjc,
  SwaggerJoiGet as sjg
} from 'midway-joi-swagger2';

@provide()
@sjc({ path: '/wx-settings', api: 'wxSettings' })
export class WxSettingsController extends BaseController {
  @inject()
  private wxSettingsService: IWxSettingsService;

  @sjg({
    path: '/',
    api: 'wxSettings',
    summary: 'index',
    description: '微信设置'
  })
  async index(ctx: Context) {
    ctx.body = await this.wxSettingsService.find();
  }
}
