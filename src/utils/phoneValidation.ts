import type { PhoneValidation } from '../types';

// Spanish mobile: 6XX, 7XX
// Spanish landline: 9XX
// Spanish special: 8XX (some VoIP)
const SPANISH_MOBILE_PREFIXES = ['6', '7'];
const SPANISH_LANDLINE_PREFIXES = ['9', '8'];
const ALL_VALID_PREFIXES = [...SPANISH_MOBILE_PREFIXES, ...SPANISH_LANDLINE_PREFIXES];

export function validateSpanishPhone(input: string): PhoneValidation {
  // Strip everything except digits and +
  const cleaned = input.replace(/[\s\-().]/g, '');

  let digits = cleaned;

  // Handle +34 prefix
  if (cleaned.startsWith('+34')) {
    digits = cleaned.slice(3);
  // Handle 0034 prefix
  } else if (cleaned.startsWith('0034')) {
    digits = cleaned.slice(4);
  // Handle 34 prefix (if exactly 11 digits)
  } else if (cleaned.startsWith('34') && cleaned.length === 11) {
    digits = cleaned.slice(2);
  }

  // Remove any remaining non-digit characters
  digits = digits.replace(/\D/g, '');

  if (!digits) {
    return { isValid: false, formatted: '', error: 'Introduce un número de teléfono' };
  }

  if (digits.length < 9) {
    return { isValid: false, formatted: '', error: 'El número es demasiado corto' };
  }

  if (digits.length > 9) {
    return { isValid: false, formatted: '', error: 'El número es demasiado largo' };
  }

  const firstDigit = digits[0];

  if (!ALL_VALID_PREFIXES.includes(firstDigit)) {
    return {
      isValid: false,
      formatted: '',
      error: 'Solo se aceptan números españoles (6XX, 7XX, 8XX, 9XX)',
    };
  }

  const formatted = `+34${digits}`;

  return { isValid: true, formatted };
}

export function formatDisplayPhone(input: string): string {
  const cleaned = input.replace(/\D/g, '');
  const digits = cleaned.slice(0, 9);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export function isMobileNumber(digits: string): boolean {
  return SPANISH_MOBILE_PREFIXES.includes(digits[0]);
}
