import type { BaseError } from '@ycore/forge/error';
import clsx from 'clsx';
import React from 'react';
import type { FormErrorProps } from './@types/form-error.types';

function FormError({ errors, for: fieldName, className, ...props }: FormErrorProps) {
  const errorMessages = errors?.[fieldName]?.flatMap((error: BaseError) => error.messages) || [];

  if (errorMessages.length === 0) {
    return null;
  }

  return (
    <div data-slot="form-error" role="alert" aria-live="polite" aria-atomic="true" className={clsx('text-destructive text-sm', className)} {...props}>
      {errorMessages.map((error: string, idx: number) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: acceptable
        <div key={idx}>{error}</div>
      ))}
    </div>
  );
}

export { FormError };
