import type { IntentActionConfig, IntentHandlers, IntentResponse } from '../../@types/intent.types';
import type { AppError, Result } from '../../result/@types/result.types';
import { err } from '../../result/core/result';

/**
 * Clones FormData by creating a new instance with all entries
 */
function cloneFormData(formData: FormData): FormData {
  const cloned = new FormData();
  formData.forEach((value, key) => {
    cloned.append(key, value);
  });
  return cloned;
}

/**
 * Executes an intent-based action handler from FormData
 */
export async function handleIntent<Handlers extends IntentHandlers>(formData: FormData, handlers: Handlers, config?: IntentActionConfig): Promise<Result<IntentResponse<Handlers>, AppError>> {
  const fieldName = config?.fieldName ?? 'intent';
  const intentValue = formData.get(fieldName);

  const intentName = typeof intentValue === 'string' ? intentValue : null;

  // Prepare FormData to pass to handlers (clone if requested)
  const handlerFormData = config?.cloneFormData ? cloneFormData(formData) : formData;

  if (intentName === null) {
    if (config?.defaultHandler) {
      return config.defaultHandler(handlerFormData) as Promise<Result<IntentResponse<Handlers>, AppError>>;
    }
    return err('Intent field is required', { field: fieldName, code: 'INTENT_MISSING' });
  }

  // Check if handler exists for the intent
  const handler = handlers[intentName];

  if (!handler) {
    return err(`Unknown intent: ${intentName}`, {
      field: fieldName,
      intent: intentName,
      availableIntents: Object.keys(handlers),
      code: 'INTENT_NOT_FOUND',
    });
  }

  return handler(handlerFormData) as Promise<Result<IntentResponse<Handlers>, AppError>>;
}

/**
 * Extracts the intent value from FormData
 */
export function getIntent(formData: FormData, fieldName = 'intent'): string | null {
  const value = formData.get(fieldName);
  return typeof value === 'string' ? value : null;
}

/**
 * Type guard to check if a FormData has a specific intent
 */
export function hasIntent(formData: FormData, intent: string, fieldName = 'intent'): boolean {
  return getIntent(formData, fieldName) === intent;
}
