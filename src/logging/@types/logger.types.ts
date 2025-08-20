export type LogLevel = "debug" | "info" | "warn" | "error";
export interface LogParams {
  event: string;
  level?: LogLevel;
  [key: string]: unknown;
}
export type BaseLogParams = Omit<LogParams, "level"> & { event: string };
