import { Router } from "express"


const routes = Router()

routes.get("/check", (req, res)=>{
    if (req.session.user) {
        // console.log(req.session.user);
        // console.log(req.session);
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
})

export default routes;