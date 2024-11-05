import { PROC_STREAM_EVENT } from "../../constants/processes.js";

export class StreamListener {
  constructor(process, handlers) {
    this.process = process;
    this.handlers = handlers;

    this._setupStandardStreamListeners();
  }
  _setupStandardStreamListeners() {
    this.process.stdout.on(PROC_STREAM_EVENT.DATA, (data) =>
      this.handlers.stdout(data.toString())
    );
    this.process.stderr.on(PROC_STREAM_EVENT.DATA, (data) =>
      this.handlers.stderr(data.toString())
    );
    this.process.on(PROC_STREAM_EVENT.EXIT, (code, signal) =>
      this.handlers.exit(code, signal)
    );
    this.process.on(PROC_STREAM_EVENT.CLOSE, (code, signal) =>
      this.handlers.close(code, signal)
    );
  }
}
