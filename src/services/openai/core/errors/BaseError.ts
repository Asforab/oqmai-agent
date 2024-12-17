export class BaseError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}