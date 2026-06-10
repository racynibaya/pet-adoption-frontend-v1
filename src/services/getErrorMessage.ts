import { ApiError } from './api';

/**
 * Resolve a user-facing message from an unknown thrown/query error: prefer the
 * backend-supplied message on an ApiError, otherwise the caller's fallback.
 * Consolidates the `error instanceof ApiError ? error.message : '…'` pattern
 * that was repeated across consumers.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}
