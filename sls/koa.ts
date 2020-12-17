import app from "../src/app"
import sls from "serverless-http"

import {APIGatewayEvent, Context} from "aws-lambda"
import {parentLogger} from "../helpers/logger";
import {IExtendedKoaRequest} from "../helpers/ext-koa-req";

const log = parentLogger.child({childLoggerName: "koa sls wrapper"});

export const ts = async (evt: APIGatewayEvent, ctx: Context) => {
    ctx.callbackWaitsForEmptyEventLoop = false;

    return sls(app, {
        request: (
            req: IExtendedKoaRequest,
            event: APIGatewayEvent,
            context: Context
        ) => {
            ctx.callbackWaitsForEmptyEventLoop = false;
            if (!process.env.IS_OFFLINE) {
                log.info({ event, context });
            }

            req.url = req.url.replace(`/${process.env.STAGE}`, "");
            req.url = req.url === "" ? "/" : req.url;

            // Adding the initial event and context to the request
            req.__event = event;
            req.__context = context;
        }
    })(evt, ctx);
};
