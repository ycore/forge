/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import type { BaseSchema, InferOutput } from 'valibot';
import type { FieldError } from '../../error/@types/error.types';
import type { TypedResult } from '../../http/@types/http.types';

export type ValidationResult<S extends BaseSchema<any, any, any>> = TypedResult<InferOutput<S>, FieldError>;
