import type { IconNode } from 'lucide';

import type { ScreenshotId } from './screenshot';

export interface RoleCard {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: IconNode;
  readonly bullets: readonly string[];
  readonly screenshot: ScreenshotId;
}
