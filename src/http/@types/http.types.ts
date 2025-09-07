import type { ErrorCollection } from "../../error";

/**
 * Standard response structure for loader and action returns
 */
export type TypedResult<T = unknown, E = ErrorCollection> = { data: T; errors: null } | { data: null; errors: E };

export type ResponseData<T = unknown, E = unknown> = { success: true; data: T; errors: null; } | { success: false; data: null; errors: E; };
