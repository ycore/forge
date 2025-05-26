type HeaderSource = 'referer' | 'origin' | 'current';
type DomainUrl = string;
/**
 * Gets the domain URL from nominated header sources with fallback priority
 */
export declare function getDomainUrl(request: Request, headerSource?: HeaderSource[]): DomainUrl | null;
/**
 * Gets unique domain URLs from nominated header sources
 */
export declare function getDomainUrls(request: Request, headerSource: HeaderSource[]): DomainUrl[] | null;
/**
 * Returns the host from a request, considering proxy headers
 */
export declare function getCurrentHost(request: Request): string;
/**
 * Returns the protocol from a request, considering proxy headers
 */
export declare function getCurrentProtocol(request: Request): string;
export {};
//# sourceMappingURL=request.d.ts.map