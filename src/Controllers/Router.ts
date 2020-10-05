import * as core from "express-serve-static-core";

export interface Router {
    router: core.Router,
    path: string;
}