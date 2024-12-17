import React from 'react';
import { GraduationCap, MessageSquare, Brain, FileText } from 'lucide-react';
import { Feature } from './Feature';

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
      <Feature 
        icon={<GraduationCap className="w-6 h-6 text-orange-500" />}
        title="Preparação Especializada"
        description="Conteúdo focado na preparação para o TEOT"
      />
      <Feature 
        icon={<MessageSquare className="w-6 h-6 text-orange-500" />}
        title="Interação Natural"
        description="Explicações claras e objetivas"
      />
      <Feature 
        icon={<Brain className="w-6 h-6 text-orange-500" />}
        title="Aprendizado Adaptativo"
        description="Sistema que se adapta ao seu conhecimento"
      />
      <Feature 
        icon={<FileText className="w-6 h-6 text-orange-500" />}
        title="Material Atualizado"
        description="Últimas diretrizes e protocolos"
      />
    </div>
  );
}