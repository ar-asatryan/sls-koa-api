import Koa from "koa";
import cors from "@koa/cors";
import compose from "koa-compose";

const app = new Koa()

import myGetCall from "./routes/first-router"
import myPostCall from "./routes/another-router"

app.use(
  compose([
      cors(),
      myGetCall.routes() as any,
      myPostCall.routes(),
  ])
);

export default app;
