/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import type { BaseSchema, InferOutput } from 'valibot';
import type { FieldError, TypedResult } from '../../error/@types/error.types';

export type ValidationResult<S extends BaseSchema<any, any, any>> = TypedResult<InferOutput<S>, FieldError>;
