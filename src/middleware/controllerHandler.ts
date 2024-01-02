import { Request, Response, NextFunction } from "express";

// all controllers can use.
export default function makeControllerHandler(controller: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
      },
    };
    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.cookies) {
        httpResponse.cookies.forEach((cookie: any) => {
          Object.entries(cookie).forEach(([key, value]: any) => {
            res.cookie(key, value.value, {
              httpOnly: value.httpOnly,
              maxAge: value.maxAge,
            });
          });
        });
      }
      if (httpResponse.headers) {
        res.set(httpRequest.headers);
      }
      res.type("json");
      return res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (err) {
      next(err);
    }
  };
}
