import { Socket } from "net";
import { encrypt } from "./encrypt";
import { encryptedMessage } from "./RSA";

class Service {
  public async Receiver(): Promise<string> {
    return new Promise<string>((resolve) => {
      const client: Socket = require("net").connect({ port: 3000 }, () => {
        const message: string = "Hello from Server 2!";
        const obj = {
          number: 10,
          string: "sender",
          boolean: true,
          stNu: "10",
        };

        // client.write("port-to-port" + message);

        //! <------------ Encrypt Start --------------->

        // console.log(JSON.stringify(obj));
        const result = encrypt(JSON.stringify(obj), 10);
        console.log(result);
        encryptedMessage;
        //! <-------------- Encrypt End ---------->

        client.write(JSON.stringify(result));
        client.end();
        resolve(message);
      });
    });
  }
}

export const DataTransfer: Service = new Service();
