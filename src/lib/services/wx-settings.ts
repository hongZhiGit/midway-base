/*
 * @Author: 吴占超
 * @Date: 2019-05-25 10:24:02
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-05-26 10:26:46
 * 微信设置
 */
// import { WxSettings } from '@models/wx-settings.model.ts';
import { inject, provide } from 'midway';
import { IWxSettingsModel } from '../models/wx-settings.model';
import { BaseService } from '../../base/base.service';

export interface IWxSettingsService extends WxSettingsService {}

@provide()
export class WxSettingsService extends BaseService {
  @inject('WxSettingsModel')
  private WxSettings: IWxSettingsModel;

  async find() {
    this.cthrow(511, '测试错误信息');
    return this.WxSettings.findAll();
  }
}
