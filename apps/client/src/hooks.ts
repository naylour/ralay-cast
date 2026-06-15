import { i18nReroute } from '@lib/i18n';
import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = request => i18nReroute(request);
