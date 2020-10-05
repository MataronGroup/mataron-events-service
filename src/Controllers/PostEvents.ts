import express from "express";
import {Router} from "./Router";

export class PostEvent implements Router {

    public path = '/post';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.post(this.path, this.createPost.bind(this));

    }


    createPost (req: express.Request, res: express.Response)
    {
        const arenaType = req.body.arenaType;
        const baseType = req.body.baseType;
        const roomType = req.body.roomType;
        const boxType = req.body.boxType;
        const soldiersType = req.body.soldiersType;
        const positionType = req.body.positionType;


        if (arenaType !=="number" && arenaType.length === 0)
        {
            res.status(400).send("missing fields");
        }
        res.status(200).send("TIL");

        if(baseType !=="number")





      
      


  
    }

}




