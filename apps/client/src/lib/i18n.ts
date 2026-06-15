import type { Handle, Reroute } from '@sveltejs/kit';
import { deLocalizeUrl, getTextDirection } from './i18n/runtime';
import { paraglideMiddleware } from './i18n/server';

export const i18nReroute: Reroute = request => deLocalizeUrl(request.url).pathname;

export const handleI18n: Handle = ({ event, resolve }) =>
    paraglideMiddleware(event.request, ({ request, locale }) => {
        event.request = request;

        return resolve(event, {
            transformPageChunk: ({ html }) =>
                html
                    .replace('%i18n.lang%', locale)
                    .replace('%i18n.dir%', getTextDirection(locale)),
        });
    });
