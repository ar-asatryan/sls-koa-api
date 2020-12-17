import Router from "@koa/router"
const router = new Router();

const user2 = {
    "name": "Richard",
    "email": "richard15@gmail.com",
    "text": "someText concerning Richard"
}

const myPostCall = router.post("/second", async (ctx: any) => {
    ctx.body = user2;
});


export default myPostCall