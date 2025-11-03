import type { IntentProps } from '../@types/intent.types';

export function Intent({ value, name = 'intent' }: IntentProps): React.JSX.Element {
  return <input type="hidden" name={name} value={value} />;
}
