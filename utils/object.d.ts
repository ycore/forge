export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type FlexiblePartial<T> = {
    [P in keyof T]?: T[P] extends object ? FlexiblePartial<T[P]> : T[P];
} & Record<string, any>;
/**
 * Deep merges two objects, with overrides taking precedence
 * @param defaults The default values
 * @param overrides The override values (optional)
 * @returns A merged object
 */
export declare function deepMerge<T extends object>(defaults: T, overrides?: DeepPartial<T>): T;
//# sourceMappingURL=object.d.ts.map