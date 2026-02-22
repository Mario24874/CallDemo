import { useState } from 'react'
import Header from './components/Header'
import PhoneInput from './components/PhoneInput'
import FeatureCards from './components/FeatureCards'
import { requestCall } from './services/callService'
import type { CallStatus } from './types'
import { Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

function App() {
  const [phone, setPhone] = useState('')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [status, setStatus] = useState<CallStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handlePhoneChange = (value: string, valid: boolean) => {
    setPhone(value)
    setIsPhoneValid(valid)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isPhoneValid) return

    setStatus('loading')
    setErrorMessage('')

    try {
      await requestCall({ phone })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Error al procesar la solicitud')
    }
  }

  const handleReset = () => {
    setPhone('')
    setIsPhoneValid(false)
    setStatus('idle')
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md animate-slide-up">

          {/* Hero copy */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2E9DD8] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#2E9DD8] rounded-full animate-pulse" />
              Natasha lista para llamarte
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] leading-tight mb-2">
              Tu primera visita,<br />
              <span className="text-[#2E9DD8]">completamente gratis</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Introduce tu número y Natasha te llamará en menos de 2 minutos para agendar tu cita.
            </p>
          </div>

          {/* Card */}
          <div className="card p-6 sm:p-8 mb-4">

            {/* Idle / form state */}
            {(status === 'idle' || status === 'loading') && (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <PhoneInput
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={status === 'loading'}
                />

                <button
                  type="submit"
                  disabled={!isPhoneValid || status === 'loading'}
                  className="btn-primary"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Conectando con Natasha…
                    </>
                  ) : (
                    <>
                      <span className="animate-ring">📞</span>
                      Solicitar llamada gratuita
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Sin compromisos · Solo para España · Tu datos son privados
                </p>
              </form>
            )}

            {/* Success state */}
            {status === 'success' && (
              <div className="text-center py-4 animate-scale-in space-y-4">
                <div className="relative inline-flex items-center justify-center">
                  <div className="pulse-ring w-16 h-16 rounded-full bg-green-100 flex items-center justify-center relative z-10">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1B3A5C] mb-1">¡Solicitud enviada!</h2>
                  <p className="text-gray-500 text-sm">
                    Natasha te llamará al{' '}
                    <span className="font-semibold text-[#1B3A5C]">+34 {phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}</span>
                    {' '}en menos de 2 minutos.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-[#2E9DD8] hover:underline font-medium"
                >
                  Usar otro número
                </button>
              </div>
            )}

            {/* Error state */}
            {status === 'error' && (
              <div className="text-center py-4 animate-scale-in space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1B3A5C] mb-1">Algo salió mal</h2>
                  <p className="text-gray-500 text-sm">{errorMessage}</p>
                </div>
                <button
                  onClick={handleReset}
                  className="btn-primary"
                >
                  <Phone className="w-4 h-4" />
                  Intentar de nuevo
                </button>
              </div>
            )}
          </div>

          {/* Feature cards */}
          <FeatureCards />
        </div>
      </main>
    </div>
  )
}

export default App
