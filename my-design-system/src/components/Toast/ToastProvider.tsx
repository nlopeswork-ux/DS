import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { ToastContext } from './ToastContext';
import type { ToastApi, ToastOptions } from './Toast.types';

interface ToastItem extends ToastOptions {
  id: string;
  restartKey: number;
}

/** Three at a time — the oldest is evicted when a fourth arrives. */
const MAX_VISIBLE = 3;

let counter = 0;
const isSame = (a: ToastOptions, b: ToastOptions) =>
  (a.color ?? 'info') === (b.color ?? 'info') && a.title === b.title && a.supportingText === b.supportingText;

/**
 * Renders toasts in a fixed region — upper right on desktop, bottom of the
 * screen on mobile — newest closest to the screen edge. Wrap the app once and
 * call `useToast()` anywhere below.
 */
export const ToastProvider = ({ children, maxVisible = MAX_VISIBLE }: { children: ReactNode; maxVisible?: number }) => {
  // Newest first.
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => setItems((prev) => prev.filter((item) => item.id !== id)), []);
  const dismissAll = useCallback(() => setItems([]), []);

  const toast = useCallback(
    (options: ToastOptions) => {
      let id = `toast-${(counter += 1)}`;
      setItems((prev) => {
        const existing = prev.find((item) => isSame(item, options));
        if (existing) {
          // No duplicates: restart the timer of the toast already on screen.
          id = existing.id;
          return prev.map((item) => (item === existing ? { ...item, restartKey: item.restartKey + 1 } : item));
        }
        return [{ ...options, id, restartKey: 0 }, ...prev].slice(0, maxVisible);
      });
      return id;
    },
    [maxVisible],
  );

  const api = useMemo<ToastApi>(() => ({ toast, dismiss, dismissAll }), [toast, dismiss, dismissAll]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-xl bottom-xl z-[60] flex flex-col-reverse gap-lg sm:inset-x-auto sm:top-xl sm:right-xl sm:bottom-auto sm:flex-col sm:items-end">
            {/* Newest first: closest to the top edge on desktop; flex-col-reverse puts it closest to the bottom edge on mobile. */}
            {items.map(({ id, restartKey, onDismiss, ...options }) => (
              <div key={id} className="toast-enter pointer-events-auto max-sm:w-full">
                <Toast
                  {...options}
                  restartKey={restartKey}
                  onDismiss={() => {
                    dismiss(id);
                    onDismiss?.();
                  }}
                />
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
