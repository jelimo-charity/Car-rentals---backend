import { MiddlewareHandler, Context } from 'hono';
import formidable from 'formidable';

export const uploadMiddleware: MiddlewareHandler = async (c, next) => {
  const form = formidable({ multiples: true });

  await new Promise((resolve, reject) => {
    form.parse(c.req.raw as any, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        // Attach fields and files to the request object
        (c.req as any).body = { fields, files };
        resolve(null);
      }
    });
  });

  await next();
};
