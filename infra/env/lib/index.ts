import * as v from 'valibot';

export const ENV_SCHEMA = v.object({
    TELEGRAM_API_TOKEN: v.pipe(v.string(), v.minLength(0)),
});

export type ENV_TYPE = v.InferOutput<typeof ENV_SCHEMA>;

export const loadEnv = (env = Bun.env) => v.parse(ENV_SCHEMA, env);
export const env = loadEnv(Bun.env);
