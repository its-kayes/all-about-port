import * as net from "net";
import * as child_process from "child_process";

class PortScanner {
  async getActivePorts(): Promise<string[]> {
    const activePorts: string[] = [];

    for (let port = 1; port <= 65535; port++) {
      const isPortOpen = await this.isPortOpen(port);
      if (isPortOpen) {
        activePorts.push(`"${port}"`);
      }
    }

    return activePorts;
  }

  async getListeningPorts(): Promise<string[]> {
    const listeningPorts: string[] = [];

    for (let port = 1; port <= 65535; port++) {
      const isPortListening = await this.isPortListening(port);
      if (isPortListening) {
        listeningPorts.push(`"${port}"`);
      }
    }

    return listeningPorts;
  }

  async isPortListening(port: number): Promise<boolean> {
    const isPortOpen = await this.isPortOpen(port);
    return !isPortOpen;
  }

  async isKillPort(port: number): Promise<boolean> {
    const isPortListening = await this.isPortListening(port);

    if (isPortListening) {
      this.killPort(port);
    }

    return !isPortListening;
  }

  private isPortOpen(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const server = net.createServer();
      server.unref();
      server.on("error", () => resolve(false));
      server.listen(port, "127.0.0.1", () => {
        server.close(() => resolve(true));
      });
    });
  }

  private killPort(port: number): void {
    const platform = process.platform;

    let command = "";

    if (platform === "win32") {
      command = `netstat -ano | findStr "${port}" | findStr "LISTENING" | for /f "tokens=5" %a in ('more') do taskkill /F /PID %a`;
    } else if (platform === "linux" || platform === "darwin") {
      command = `lsof -i :${port} -t | xargs kill -9`;
    } else {
      console.error(`Unsupported platform: ${platform}`);
      return;
    }

    child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error killing process on port ${port}: ${stderr}`);
      } else {
        console.log(`Successfully killed the process on port ${port}`);
      }
    });
  }

  public async portForwarding() {
    return new Promise((resolve, reject) => {
      const server = net.createServer((client) => {
        const target = net.createConnection({
          host: "192.168.1.104",
          port: 5173,
        });

        console.log("Client connected", client.remoteAddress);

        client.pipe(target);
        target.pipe(client);

        client.on("end", () => target.end());
        target.on("end", () => client.end());

        client.on("error", (err) => console.error("Client error:", err));
        target.on("error", (err) => console.error("Target error:", err));
      });

      server.listen(5000, () => {
        console.log("Port forwarding server running on port 5000");
        resolve("Port forwarding successful");
      });

      server.on("error", (err) => {
        console.error("Server error:", err);
        reject(err);
      });
    });
  }
}

export const portScanner = new PortScanner();
