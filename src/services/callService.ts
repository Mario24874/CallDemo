import type { CallRequestPayload, CallResponse } from '../types';

// n8n webhook URL - update this with your actual n8n webhook path
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL ||
  'https://n8n-quico-n8n.lvn5h9.easypanel.host/webhook/segurident-llamada';

export async function requestCall(payload: CallRequestPayload): Promise<CallResponse> {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: payload.phone,
      name: payload.name || 'Cliente',
      timestamp: new Date().toISOString(),
      source: 'web-app',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Error desconocido');
    throw new Error(errorText || `Error del servidor: ${response.status}`);
  }

  const data = await response.json().catch(() => ({ success: true }));
  return data as CallResponse;
}
