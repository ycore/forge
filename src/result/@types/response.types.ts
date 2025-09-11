export interface ToastOptions {
  toast: string;
}

export interface ResponseOptions {
  status?: number;
  headers?: HeadersInit;
  href?: string;
}

export type FormErrorProps = {
  error?: import('./result.types').AppError | null;
  for: string;
} & React.ComponentProps<'div'>;