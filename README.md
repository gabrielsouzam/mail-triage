# 📧 Mail Triage

Sistema inteligente de classificação de emails utilizando IA do Google Gemini.

## Tecnologias

**Backend:**
- FastAPI + Python 3.11
- Google Gemini AI
- PostgreSQL + SQLModel
- OAuth 2.0 (Google)
- Alembic
- SQLModel
- JWT

**Frontend:**
- React + TypeScript
- Vite
- TailwindCSS
- Axios
- React Router DOM
- React Hook Form + Zod

## Pré-requisitos

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Chave API Google Gemini ([obter aqui](https://makersuite.google.com/app/apikey))
- Google OAuth Client ID ([configurar aqui](https://console.cloud.google.com))

## Configuração

### Backend (API)

```bash
cd api
cp .env.example .env
# Configure as variáveis no .env
uv sync  --dev
alembic upgrade head
uvicorn src.app:app --reload
```

### Frontend (Web)

```bash
cd web
cp .env.example .env
# Configure VITE_GOOGLE_CLIENT_ID no .env
npm install
npm run dev
```

### Funcionalidades

- Autenticação OAuth 2.0 com Google
- Classificação de emails (Produtivo/Improdutivo)
- Sugestões de respostas com IA
- Dashboard com informações
- Histórico de análises
- Interface responsiva

## Links

- **Web:** https://mail-triage-pi.vercel.app
- **API:** https://mail-triage-e3hf.onrender.com
- **Docs:** https://mail-triage-e3hf.onrender.com/docs

## Autor

Desenvolvido por Gabriel Mendes
