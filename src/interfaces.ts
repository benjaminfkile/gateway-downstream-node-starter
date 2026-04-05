import { TNodeEnvironment } from "./types";

// ---- App / API secrets (stored in AWS Secrets Manager via AWS_SECRET_ARN) ----
export interface IAPISecrets {
  node_env: TNodeEnvironment;
  port: string;
  db_name: string;
  db_host: string;
  // Add additional app-level secrets here as needed
}

// ---- DB secrets (stored in AWS Secrets Manager via AWS_DB_SECRET_ARN) ----
export interface IDBSecrets {
  username: string;
  password: string;
  engine: "postgres";
  host: string;
  port: number;
  dbInstanceIdentifier: string;
}

// ---- DB health check result ----
export interface IDBHealth {
  connected: boolean;
  connectionUsesProxy: boolean;
  logs?: {
    messages: string[];
    host?: string;
    timestamp: string;
    error?: string;
  };
}
