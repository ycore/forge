/**
 * Deep partial type for recursive partial application
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Type guard to check if a value is a plain object
 */
function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date));
}

/**
 * Intelligently merge arrays based on object identity
 * For arrays of objects with 'name' property, merge by name
 * Otherwise, replace the array
 */
function mergeArrays<T>(target: T[], source: T[]): T[] {
  // Check if both arrays contain objects with 'name' property
  const hasNamedObjects = target.every(item =>
    isObject(item) && typeof (item as any).name === 'string'
  ) && source.every(item =>
    isObject(item) && typeof (item as any).name === 'string'
  );

  if (hasNamedObjects) {
    // Merge by name property
    const result = [...target];
    const resultMap = new Map<string, number>();

    // Create map of existing items by name
    result.forEach((item, index) => {
      resultMap.set((item as any).name, index);
    });

    // Merge or add source items
    for (const sourceItem of source) {
      const name = (sourceItem as any).name;
      const existingIndex = resultMap.get(name);

      if (existingIndex !== undefined) {
        // Merge with existing item
        result[existingIndex] = deepMerge(result[existingIndex] as object, sourceItem as object) as T;
      } else {
        // Add new item
        result.push(sourceItem);
        resultMap.set(name, result.length - 1);
      }
    }

    return result;
  }

  // For other arrays, replace completely
  return source;
}

/**
 * Modern performant deep merge utility using best practices
 * - Type-safe with proper generic constraints
 * - Handles nested objects recursively
 * - Intelligently merges arrays of named objects
 * - Excludes Date objects from deep merging
 */
export function deepMerge<T extends object>(target: T, ...sources: Array<DeepPartial<T>>): T {
  if (!sources.length) return target;

  const result = structuredClone(target);

  for (const source of sources) {
    if (!source) continue;

    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (sourceValue === undefined) continue;

      if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
        // Intelligently merge arrays
        (result as any)[key] = mergeArrays(targetValue, sourceValue);
      } else if (isObject(sourceValue) && isObject(targetValue)) {
        // Recursively merge nested objects
        (result as any)[key] = deepMerge(targetValue as object, sourceValue as DeepPartial<object>);
      } else {
        // Direct assignment for primitives, dates, null, etc.
        (result as any)[key] = sourceValue;
      }
    }
  }

  return result;
}

// Export types
export type { DeepPartial };
