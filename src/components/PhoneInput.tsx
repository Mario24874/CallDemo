import { useState, useRef } from 'react';
import { Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { validateSpanishPhone, formatDisplayPhone } from '../utils/phoneValidation';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  disabled?: boolean;
}

export default function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const rawDigits = value.replace(/\D/g, '').slice(0, 9);
  const displayValue = formatDisplayPhone(rawDigits);
  const validation = touched && rawDigits.length > 0
    ? validateSpanishPhone(rawDigits)
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Keep only digits from the display value
    const digits = input.replace(/\D/g, '').slice(0, 9);
    const v = validateSpanishPhone(digits);
    onChange(digits, v.isValid);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const borderClass = !touched || rawDigits.length === 0
    ? 'border-gray-200 focus:ring-[#2E9DD8] focus:border-transparent'
    : validation?.isValid
      ? 'border-green-400 focus:ring-green-400 focus:border-transparent'
      : 'border-red-400 focus:ring-red-400 focus:border-transparent';

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-[#1A2B3C]">
        Tu número de teléfono
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="relative">
        {/* Country prefix */}
        <div className="absolute left-0 inset-y-0 flex items-center">
          <div className="flex items-center gap-1.5 pl-3.5 pr-3 border-r border-gray-200 h-full">
            <span className="text-lg" role="img" aria-label="España">🇪🇸</span>
            <span className="text-sm font-semibold text-[#1B3A5C]">+34</span>
          </div>
        </div>

        {/* Phone input */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9 ]*"
          placeholder="6XX XXX XXX"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`input-field pl-[5.5rem] pr-10 ${borderClass} transition-all duration-200`}
          aria-describedby="phone-hint"
          autoComplete="tel-national"
        />

        {/* Status icon */}
        {touched && rawDigits.length > 0 && (
          <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none">
            {validation?.isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
          </div>
        )}

        {!touched || rawDigits.length === 0 ? (
          <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none">
            <Phone className="w-4.5 h-4.5 text-gray-400" />
          </div>
        ) : null}
      </div>

      {/* Hint / error */}
      <div id="phone-hint" className="min-h-[20px]">
        {touched && rawDigits.length > 0 && !validation?.isValid && validation?.error ? (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {validation.error}
          </p>
        ) : (
          <p className="text-xs text-gray-400">
            Solo números de España · Móvil (6XX, 7XX) o fijo (9XX)
          </p>
        )}
      </div>
    </div>
  );
}
