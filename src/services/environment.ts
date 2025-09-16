import { createContext, type RouterContextProvider } from 'react-router';

/**
 * Environment type definition
 */
export type Environment = 'development' | 'production' | 'test';

/**
 * Environment context for storing the current environment state
 */
export const EnvironmentContext = createContext<Environment>('development');

/**
 * Get the current environment from context
 */
export function getEnvironment(context: Readonly<RouterContextProvider>): Environment {
  return context.get(EnvironmentContext);
}

/**
 * Check if the application is running in development mode
 */
export function isDevelopment(context: Readonly<RouterContextProvider>): boolean {
  return getEnvironment(context) === 'development';
}

/**
 * Check if the application is running in production mode
 */
export function isProduction(context: Readonly<RouterContextProvider>): boolean {
  return getEnvironment(context) === 'production';
}

/**
 * Check if the application is running in test mode
 */
export function isTesting(context: Readonly<RouterContextProvider>): boolean {
  return getEnvironment(context) === 'test';
}
