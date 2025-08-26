import type { FieldError } from '@ycore/forge/error';

export type FormErrorProps = {
  errors?: FieldError | null;
  for: string;
} & React.ComponentProps<'div'>;
