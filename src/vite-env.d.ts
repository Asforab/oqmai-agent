/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_ORGANIZATION_ID: string
  readonly VITE_ASSISTANT_ID: string
  readonly VITE_REFINE_QUERY_BOT_ID: string
  readonly VITE_VALIDATION_BOT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}