import Router from "@koa/router"
const router = new Router();

const user1 = {
    "name": "Legolas",
    "email": "legolas15@gmail.com",
    "text": "Do not look at this Text, it's forbidden!!!"
}

const myGetCall = router.get("/first", async (ctx: any) => {
    ctx.body = user1;
});


export default myGetCall