import { Socket } from "net";

class Service {
  public async Receiver(): Promise<string> {
    return new Promise<string>((resolve) => {
      const client: Socket = require("net").connect({ port: 3000 }, () => {
        const message: string = "Hello from Server 2!";
        const obj = {
          name: "kayes",
          age: 23,
        };

        client.write(JSON.stringify(obj));
        // client.write("port-to-port" + message);

        //! <------------ Encrypt Start --------------->

        //! <-------------- Encrypt End ---------->

        client.end();
        resolve(message);
      });
    });
  }
}

export const DataTransfer: Service = new Service();
