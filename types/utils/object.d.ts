import type { DeepPartial } from './@types/object.types';
/**
 * Deep merges two objects, with overrides taking precedence
 * @param defaults The default values
 * @param overrides The override values (optional)
 * @returns A merged object
 */
export declare function deepMerge<T extends object>(defaults: T, overrides?: DeepPartial<T>): T;
//# sourceMappingURL=object.d.ts.map