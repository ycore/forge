export interface RequestMetadata {
  userAgent: string;
  country: string;
  ipAddress: string;
  cfRay?: string;
  cfConnectingIp?: string;
}
