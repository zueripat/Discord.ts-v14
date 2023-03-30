export default class Log {
  public namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  private currentTime(): string {
    return new Date().toLocaleString("de-CH");
  }

  public debug(message: string): void {
    console.debug(`[ ${this.currentTime()} ] [ DEBUG ] [ ${this.namespace} ] ${message}`);
  }

  public info(message: string): void {
    console.info(`[ ${this.currentTime()} ] [ INFO ] [ ${this.namespace} ] ${message}`);
  }

  public warn(message: string): void {
    console.warn(`[ ${this.currentTime()} ] [ WARN ] [ ${this.namespace} ] ${message}`);
  }

  public error(message: string): Error {
    const finalMessage = `[ ${this.currentTime()} ] [ ERROR ] [ ${this.namespace} ] ${message}`;
    console.error(finalMessage);
    return new Error(finalMessage);
  }
}