import { APIGatewayEvent, Context } from "aws-lambda";
import { Request } from "koa";

export interface IExtendedKoaRequest extends Request {
    __event: APIGatewayEvent;
    __context: Context;
    __requesterId?: string | null;
    __permissions?: string[] | null;
}
