import {NestFactory} from "@nestjs/core";
import {ExpressAdapter} from "@nestjs/platform-express";
import * as express from "express";
import * as functions from "firebase-functions";
import {AppModule} from "./src/app.module";

const server = express();
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    next();
});

async function bootstrap(expressInstance) {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance)
    );
    await app.init();
}

export const api = functions
    .region("europe-central2")
    .https.onRequest((req, res) => {
    bootstrap(server)
        .then(() => {
            server(req, res);
        })
        .catch((e) => {
            console.error(e);
            res.status(500).send("Internal Server Error");
        });
});