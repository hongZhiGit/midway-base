/*
 * @Author: 吴占超
 * @Date: 2019-07-04 15:54:27
 * @Last Modified by:   吴占超
 * @Last Modified time: 2019-07-04 15:54:27
 */
import * as joi from 'joi';
import * as _ from 'lodash';
const joiValidate = (param: any, schema: any) => {
  return new Promise((resolve, reject) => {
    !schema && resolve({ body: 'not schema' });
    joi.validate(param, schema, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
};

module.exports = () => {
  return async function swaggerJoi(ctx, next) {
    const key = `${ctx.path}-[${_.toLower(ctx.request.method)}]`;
    if (!ctx.app.joiSchemas || !ctx.app.joiSchemas[key]) {
      return next();
    }
    const schema = ctx.app.joiSchemas[key];
    await joiValidate(ctx.request.body, schema.body)
      .then(result => {
        return joiValidate(ctx.query, schema.query);
      })
      .then(result => {
        return joiValidate(ctx.params, schema.pathParams);
      })
      .then(result => {
        return joiValidate(ctx.request.body, schema.formData);
      })
      .catch(err => {
        return ctx.throw(422, JSON.stringify(err));
      });
    return next();
  };
};
