/** biome-ignore-all lint/suspicious/noExplicitAny: acceptable */
import type { Params } from 'react-router';
import { type BaseSchema, safeParse } from 'valibot';

import { parseIssues } from '../error/error-transformer';
import { returnFailure, returnSuccess } from '../http/return-helpers';
import type { ValidationResult } from './@types/validate-helpers.types';

async function validate<S extends BaseSchema<any, any, any>>(schema: S, input: any): Promise<ValidationResult<S>> {
  const result = safeParse(schema, input);

  if (result.success) {
    return returnSuccess(result.output);
  }

  return returnFailure(parseIssues(result.issues));
}

export async function validateParams<S extends BaseSchema<any, any, any>>(schema: S, params: Params): Promise<ValidationResult<S>> {
  return await validate(schema, params);
}

export async function validateFormData<S extends BaseSchema<any, any, any>>(schema: S, requestOrFormData: Request | FormData): Promise<ValidationResult<S>> {
  const formData = requestOrFormData instanceof FormData ? requestOrFormData : await requestOrFormData.formData();

  const object: Record<string, any> = {};

  formData.forEach((value, key) => {
    object[key] = value instanceof File ? value : String(value);
  });

  return await validate(schema, object);
}

// Convenience function for validating from Request
export async function validateRequest<S extends BaseSchema<any, any, any>>(schema: S, request: Request): Promise<ValidationResult<S>> {
  return validateFormData(schema, request);
}
