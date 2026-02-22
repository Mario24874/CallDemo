import { Zap, Shield, Calendar, Phone } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Llamada inmediata',
    description: 'Natasha te llama en menos de 2 minutos',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Shield,
    title: 'Primera visita gratis',
    description: 'Revisión completa sin ningún coste',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: Calendar,
    title: 'Agenda tu cita',
    description: 'Cita en la clínica más cercana a ti',
    color: 'text-[#2E9DD8]',
    bg: 'bg-blue-50',
  },
  {
    icon: Phone,
    title: 'Sin esperas',
    description: 'Atención directa y personalizada',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {features.map((feat) => {
        const Icon = feat.icon;
        return (
          <div
            key={feat.title}
            className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
          >
            <div className={`${feat.bg} w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <Icon className={`w-4.5 h-4.5 ${feat.color}`} size={18} />
            </div>
            <p className="text-xs font-semibold text-[#1A2B3C] leading-tight">{feat.title}</p>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{feat.description}</p>
          </div>
        );
      })}
    </div>
  );
}
