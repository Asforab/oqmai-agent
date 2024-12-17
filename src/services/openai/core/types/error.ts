export interface ErrorDetails {
  code: string;
  message: string;
  status?: number;
  cause?: unknown;
}

export interface ErrorResponse {
  error: ErrorDetails;
  timestamp: number;
  requestId?: string;
}