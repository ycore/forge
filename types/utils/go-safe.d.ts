import type { SafeResponse } from './@types/go-safe.types';
export declare function go<D>(promise: Promise<D>, throwNative?: boolean): Promise<SafeResponse<D>>;
export declare function go<D>(fn: () => D, throwNative?: boolean): SafeResponse<D>;
//# sourceMappingURL=go-safe.d.ts.map