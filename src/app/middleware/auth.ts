import { IAuth } from '../../lib/interfaces/sys-user';
/*
 * @Author: 吴占超
 * @Date: 2019-06-07 16:01:26
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-07-16 16:28:14
 * auth 创建
 */

async function checkVerify(ctx: any, token: string): Promise<IAuth> {
  return new Promise(resolve => {
    ctx.app.jwt.verify(
      token,
      ctx.app.config.jwt.secret,
      async (err: any, decoded: IAuth) => {
        if (err) {
          ctx.throw(401.1, 'login error');
        }
        resolve(decoded);
      }
    );
  });
}

module.exports = () => {
  return async function auth(ctx: any, next: () => void) {
    const { token } = ctx.request.header;
    if (token) {
      const decoded = await checkVerify(ctx, token);
      const auth: IAuth = await ctx.requestContext.getAsync('Auth');
      auth.id = decoded.id;
      auth.code = decoded.code;
      auth.onTime = decoded.onTime;
      auth.userName = decoded.userName;
      auth.provider = decoded.provider;
      await next();
    } else {
      ctx.throw(401.2, 'auth error');
    }
  };
};
