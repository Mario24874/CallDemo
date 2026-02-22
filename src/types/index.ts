export type CallStatus = 'idle' | 'loading' | 'success' | 'error';

export interface CallRequestPayload {
  phone: string;
  name?: string;
}

export interface CallResponse {
  success: boolean;
  message?: string;
  call_id?: string;
  error?: string;
}

export interface PhoneValidation {
  isValid: boolean;
  formatted: string;
  error?: string;
}
