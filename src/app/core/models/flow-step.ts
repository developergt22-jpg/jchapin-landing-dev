import type { IconNode } from 'lucide';

/** Paso de una secuencia (cómo funciona, ciclo del evento, instalación del APK). */
export interface FlowStep {
  readonly title: string;
  readonly description: string;
  readonly icon?: IconNode;
}
