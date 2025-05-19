import type { BaseErrorProps } from './@types/error-base.types';
export declare class BaseError<T extends string> extends Error {
    kind: T;
    cause: unknown;
    constructor(kind: T, message: string, cause?: unknown);
    constructor(props: BaseErrorProps<T>);
}
//# sourceMappingURL=error-base.d.ts.map