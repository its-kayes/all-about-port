import { Router } from "express";
import { portController } from "./port/port.controller";
import { portScanner } from "./port/port-scanner.controller";

class v1 {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.routes.get("/", (req, res) => {
      res.send("Hello this is from OOP TS v1");
    });

    this.routes.get("/test", (req, res) => {
      res.send("Hello this is from OOP TS v1 test");
    });

    this.routes.get("/port", (req, res) => {
      const port = portController.getPort();
      res.send(`Port is ${port}`);
    });

    this.routes.get("/open-ports", async (req, res) => {
      const activePorts = await portScanner.getActivePorts();
      res.send(`Port active is ${activePorts}`);
    });

    this.routes.get("/listening-ports", async (req, res) => {
      const activePorts = await portScanner.getListeningPorts();
      res.send(`Port listening is ${activePorts}`);
    });

    this.routes.get("/port/:port", async (req, res) => {
      const { port } = req.params;
      const activePorts = await portScanner.isPortListening(Number(port));
      res.send(`is Port Listening ${activePorts}`);
    });

    this.routes.get("/kill-port/:port", async (req, res) => {
      const { port } = req.params;
      const activePorts = await portScanner.isKillPort(Number(port));
      res.send(`Port is kill ? ${activePorts}`);
    });

    this.routes.get("/forward-port", async (req, res) => {
      // const { port } = req.params;
      const activePorts = await portScanner.portForwarding();
      // res.send(`Port is kill ? ${activePorts}`);
      res.send(`check if port is forwarded `);
    });
  }

  public getRoutes(): Router {
    return this.routes;
  }
}

const v1Routes = new v1();

export default v1Routes;
