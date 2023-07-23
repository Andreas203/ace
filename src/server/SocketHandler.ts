export abstract class SocketHandler {
  io: any;

  constructor (io: any) {
    this.io = io;
  }

}
