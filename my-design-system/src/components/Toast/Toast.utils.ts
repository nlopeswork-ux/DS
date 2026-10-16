import type { ToastColor } from './Toast.types';

const MIN_DURATION = 4000;

/** 5s without action, 8s with one or for warnings, never under 4s; errors persist (`null`). */
export function resolveToastDuration(color: ToastColor, hasAction: boolean, duration?: number | null): number | null {
  if (duration === null) return null;
  if (typeof duration === 'number') return Math.max(MIN_DURATION, duration);
  if (color === 'error') return null;
  return color === 'warning' || hasAction ? 8000 : 5000;
}
