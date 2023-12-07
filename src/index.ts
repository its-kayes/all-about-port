import express, { Application, RequestHandler } from "express";
import v1Routes from "./v1.routes";

class MyApp {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupRoutes();
    this.startServer();
    this.initialRoutes();
  }

  private setupRoutes(): void {
    // Add your route setups here
    this.app.use("/api/v1", v1Routes.getRoutes());
  }

  private startServer(): void {
    this.app.listen(4000, () => console.log(`Server Ok ? ${4000}`));
  }

  initialRoutes(): RequestHandler {
    return this.app.get("/", (req, res) => {
      res.send("Hello this is from OOP TS");
    });
  }
}

const myApp = new MyApp();

export default myApp;
