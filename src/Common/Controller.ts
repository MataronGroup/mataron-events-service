import * as core from "express-serve-static-core";

export interface Controller {
    router: core.Router,
    path: string;
}