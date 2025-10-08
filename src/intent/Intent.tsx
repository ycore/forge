import React from 'react';
import type { IntentProps } from '../@types/intent.types';

export function Intent({ value, name = 'intent' }: IntentProps) {
  return <input type="hidden" name={name} value={value} />;
}
