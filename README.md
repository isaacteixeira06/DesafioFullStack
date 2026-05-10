# CourseSphere — Desafio Técnico Full Stack

Aplicação web de gestão de cursos e aulas com backend em Rails API e frontend em React.

---

## Tecnologias

**Backend**
- Ruby on Rails 8.1 (API mode)
- PostgreSQL 16
- JWT para autenticação
- Gemini API para sugestão de descrição de cursos
- RSpec para testes

**Frontend**
- React com Vite
- React Router
- Axios

**Infraestrutura**
- Docker + Docker Compose

---

## Estrutura do projeto
DesafioFullStack/
├── backend/    → API Rails
├── frontend/   → Aplicação React
└── docker-compose.yml

---

## Rodando com Docker

### Pré-requisitos
- Docker
- Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/isaacteixeira06/DesafioFullStack.git
cd DesafioFullStack
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edita o `.env` com suas credenciais:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=course_sphere_development
JWT_SECRET=sua_chave_secreta_aqui
GEMINI_API_KEY=sua_chave_gemini_aqui
```

### 3. Suba os containers

```bash
docker compose up --build
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000`

### 4. Popule o banco com dados de teste

```bash
docker compose exec api rails db:seed
```

---

## Usuários de teste

| Nome | Email | Senha |
|---|---|---|
| Isaac Teixeira | isaac@example.com | 123456 |
| Maria Silva | maria@example.com | 123456 |

---

## Endpoints da API

### Autenticação
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | /api/v1/auth/register | Registro de usuário | ❌ |
| POST | /api/v1/auth/login | Login | ❌ |

### Cursos
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | /api/v1/courses | Lista cursos | ✅ |
| GET | /api/v1/courses/:id | Detalhe do curso + sugestão IA | ✅ |
| POST | /api/v1/courses | Cria curso | ✅ |
| POST | /api/v1/courses/suggest_description | Sugestão de descrição via IA | ✅ |
| PATCH | /api/v1/courses/:id | Atualiza curso (apenas criador) | ✅ |
| DELETE | /api/v1/courses/:id | Remove curso (apenas criador) | ✅ |

### Aulas
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | /api/v1/courses/:course_id/lessons | Lista aulas | ✅ |
| POST | /api/v1/courses/:course_id/lessons | Cria aula (apenas criador do curso) | ✅ |
| PATCH | /api/v1/courses/:course_id/lessons/:id | Atualiza aula | ✅ |
| DELETE | /api/v1/courses/:course_id/lessons/:id | Remove aula | ✅ |

**Filtros disponíveis:**
- `GET /api/v1/courses?search=nome` — busca cursos por nome
- `GET /api/v1/courses/:id/lessons?status=draft` — filtra aulas por status

---

## Autenticação

Todas as rotas protegidas exigem o header:
Authorization: Bearer <token>

O token é retornado no login e no registro.

---

## Rodando os testes

```bash
docker compose exec -e RAILS_ENV=test -e DATABASE_URL=postgresql://postgres:postgres@db:5432/course_sphere_test api bundle exec rspec
```

---

## Arquitetura do backend
DesafioFullStack/
├── backend/
│   ├── app/
│   │   ├── controllers/api/v1/   → Controllers HTTP
│   │   ├── models/               → Entidades com validações
│   │   ├── services/             → Regras de negócio
│   │   │   ├── auth/
│   │   │   ├── courses/
│   │   │   ├── lessons/
│   │   │   └── external/         → Integração com APIs externas
│   │   └── middlewares/          → JWT Authenticator (Rack)
│   ├── lib/errors/               → Erros customizados
│   ├── config/                   → Rotas, initializers, CORS
│   ├── db/                       → Migrations e seeds
│   └── spec/                     → Testes RSpec
└── frontend/                     → Aplicação React
├── src/
│   ├── api/                  → Facade + funções de comunicação
│   ├── components/           → Componentes reutilizáveis
│   ├── context/              → AuthContext
│   ├── hooks/                → useAuth, useCourses, useLessons
│   └── pages/                → LoginPage, RegisterPage, Dashboard, CourseDetail
└── Dockerfile