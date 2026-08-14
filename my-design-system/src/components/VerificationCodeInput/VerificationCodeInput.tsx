import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { MegaInputFieldBase } from './MegaInputFieldBase';
import type { VerificationCodeInputProps } from './VerificationCodeInput.types';

function splitCode(code: string, digits: number): string[] {
  const chars = code.replace(/\D/g, '').slice(0, digits).split('');
  return Array.from({ length: digits }, (_, i) => chars[i] ?? '');
}

export function VerificationCodeInput({
  size = 'md',
  digits = 6,
  label,
  value,
  defaultValue = '',
  error = false,
  errorMessage,
  disabled = false,
  onChange,
  onComplete,
  name,
}: VerificationCodeInputProps) {
  const isControlled = value !== undefined;
  const [internalValues, setInternalValues] = useState(() => splitCode(defaultValue, digits));
  const values = isControlled ? splitCode(value, digits) : internalValues;

  /**
   * `useState`'s initializer only runs on mount, so if `digits` changes on an
   * already-mounted, uncontrolled instance (e.g. switching the Storybook
   * control), `internalValues` would otherwise keep the old digit count —
   * re-split it from the current code whenever the length no longer matches.
   */
  useEffect(() => {
    if (isControlled) return;
    setInternalValues((prev) => (prev.length === digits ? prev : splitCode(prev.join(''), digits)));
  }, [digits, isControlled]);

  const groupId = useId();
  const errorId = `${groupId}-error`;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const hasFiredComplete = useRef(false);

  useEffect(() => {
    const code = values.join('');
    if (code.length === digits && !values.includes('')) {
      if (!hasFiredComplete.current) {
        hasFiredComplete.current = true;
        onComplete?.(code);
      }
    } else {
      hasFiredComplete.current = false;
    }
  }, [values, digits, onComplete]);

  const commit = (next: string[]) => {
    if (!isControlled) setInternalValues(next);
    onChange?.(next.join(''));
  };

  const setDigit = (index: number, digit: string) => {
    const next = [...values];
    next[index] = digit;
    commit(next);
  };

  const handleChange = (index: number, rawInput: string) => {
    const digit = rawInput.replace(/\D/g, '').slice(-1);
    setDigit(index, digit);
    if (digit && index < digits - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setDigit(index - 1, '');
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < digits - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasted) return;
    event.preventDefault();
    const next = [...values];
    for (let offset = 0; offset < pasted.length && index + offset < digits; offset += 1) {
      next[index + offset] = pasted[offset];
    }
    commit(next);
    const lastFilled = Math.min(index + pasted.length, digits) - 1;
    inputRefs.current[Math.max(lastFilled, 0)]?.focus();
  };

  return (
    <div className="flex flex-col gap-sm">
      {label ? (
        <span id={`${groupId}-label`} className="text-sm font-medium text-secondary">
          {label}
        </span>
      ) : null}

      <div role="group" aria-labelledby={label ? `${groupId}-label` : undefined} className="flex gap-md">
        {name ? <input type="hidden" name={name} value={values.join('')} /> : null}
        {values.map((digit, index) => (
          <MegaInputFieldBase
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            ref={(node) => {
              inputRefs.current[index] = node;
            }}
            size={size}
            error={error}
            filled={Boolean(digit)}
            disabled={disabled}
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            aria-label={`Digit ${index + 1} of ${digits}`}
            aria-describedby={error && errorMessage ? errorId : undefined}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
          />
        ))}
      </div>

      {error && errorMessage ? (
        <p id={errorId} className={cn('text-sm text-error')}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

VerificationCodeInput.displayName = 'VerificationCodeInput';
