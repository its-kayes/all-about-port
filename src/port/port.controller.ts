class port {
  private port: number;

  constructor() {
    this.port = 5000;
  }

  public getPort(): number {
    return this.port;
  }
}

export const portController = new port();

//   private setupPort(): void {
//     this.port = 5000;
//   }
