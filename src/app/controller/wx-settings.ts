import { provide, controller, Context, get, inject } from 'midway';
import { IWxSettingsService } from '../../lib/services/wx-settings';
import { BaseController } from '../../base/base.controller';

@provide()
@controller('/wx-settings')
export class WxSettingsController extends BaseController {
  @inject()
  private wxSettingsService: IWxSettingsService;

  @get('/')
  async index(ctx: Context) {
    ctx.body = await this.wxSettingsService.find();
  }
}
