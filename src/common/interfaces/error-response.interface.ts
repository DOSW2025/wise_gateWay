export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string | string[];
}

export interface MicroserviceErrorResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  [key: string]: unknown; 
}
