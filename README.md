# CourseSphere — Desafio Técnico Full Stack

Aplicação web de gestão de cursos e aulas online, com backend em Rails API e frontend em React.

---

## 🔗 Links

| Serviço | URL |
|---|---|
| Aplicação | `https://sua-url-vercel.vercel.app` |
| Documentação API (Swagger) | `https://desafiofullstack-production-4843.up.railway.app/api-docs/index.html` |


---

## 🛠 Tecnologias

**Backend**
- Ruby on Rails 8.1 (API mode)
- PostgreSQL 16
- JWT para autenticação stateless
- Gemini API para sugestão de descrição de cursos via IA
- RSpec + FactoryBot + Shoulda Matchers para testes
- Rack CORS para controle de origens
- Rswag para documentação Swagger

**Frontend**
- React 18 com Vite
- React Router para navegação
- Axios para requisições HTTP
- Context API + hooks para gerenciamento de estado

**Infraestrutura**
- Docker + Docker Compose
- GitHub Actions para CI
- Railway (backend) + Vercel (frontend)

---

## 📁 Estrutura do Projeto
DesafioFullStack/
├── backend/                    → API Rails
├── frontend/                   → Aplicação React
├── docker-compose.yml          → Orquestra backend + frontend + banco
├── .env                        → Variáveis de ambiente (não commitado)
├── .env.example                → Modelo de variáveis de ambiente
└── .github/workflows/ci.yml   → Pipeline de CI

---

## 🏗 Arquitetura

### Backend
backend/
├── app/
│   ├── controllers/api/v1/    → Recebem requisições HTTP, delegam para services
│   │   ├── auth_controller.rb
│   │   ├── courses_controller.rb
│   │   └── lessons_controller.rb
│   ├── models/                → Entidades com validações e associações
│   │   ├── user.rb
│   │   ├── course.rb
│   │   └── lesson.rb
│   ├── services/              → Regras de negócio isoladas
│   │   ├── auth/              → RegisterUser, LoginUser
│   │   ├── courses/           → CreateCourse, UpdateCourse, DeleteCourse
│   │   ├── lessons/           → CreateLesson, UpdateLesson, DeleteLesson
│   │   └── external/          → AiSuggestionService (Gemini API)
│   └── middlewares/
│       └── jwt_authenticator.rb → Intercepta todas as requests e valida o token JWT
├── lib/errors/                → Erros customizados (Forbidden, Unauthorized)
├── config/
│   ├── routes.rb              → Define os endpoints da API
│   └── initializers/
│       ├── cors.rb            → Configura origens permitidas
│       └── jwt.rb             → Constante JWT_SECRET
├── db/
│   ├── migrate/               → Migrations do banco
│   └── seeds.rb               → Dados iniciais de teste
├── spec/                      → Testes RSpec
│   ├── models/
│   └── requests/
└── swagger/v1/swagger.yaml    → Especificação OpenAPI

**Fluxo de uma requisição:**
Request HTTP
→ rack-cors (valida origem)
→ JwtAuthenticator (valida token JWT, injeta user_id no env)
→ Controller (recebe params, chama service)
→ Service (aplica regra de negócio, ex: verifica permissão)
→ Model (valida dados, persiste no banco)
→ Controller (serializa resposta)
→ Response JSON

### Frontend
frontend/src/
├── api/
│   ├── client.js              → Instância do axios com interceptors JWT
│   ├── auth.js                → Funções de login e registro
│   ├── courses.js             → Funções de CRUD de cursos
│   ├── lessons.js             → Funções de CRUD de aulas
│   └── facade.js              → Ponto central que agrupa todas as funções de API
├── context/
│   └── AuthContext.jsx        → Armazena user e token, expõe login/logout
├── hooks/
│   ├── useAuth.js             → Lógica de autenticação (login, registro, logout)
│   ├── useCourses.js          → Fetch e estado dos cursos
│   └── useLessons.js          → Fetch e estado das aulas
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         → Barra de navegação com logout
│   │   └── ProtectedRoute.jsx → Redireciona para login se não autenticado
│   ├── courses/
│   │   ├── CourseCard.jsx     → Card de exibição do curso
│   │   └── CourseForm.jsx     → Formulário de criação/edição com sugestão IA
│   ├── lessons/
│   │   ├── LessonItem.jsx     → Item de aula com badge de status
│   │   └── LessonForm.jsx     → Formulário de criação de aula
│   └── ui/
│       ├── Spinner.jsx        → Indicador de carregamento
│       └── Alert.jsx          → Mensagens de erro/sucesso
└── pages/
├── LoginPage.jsx          → Tela de login
├── RegisterPage.jsx       → Tela de registro
├── DashboardPage.jsx      → Lista de cursos com busca
└── CourseDetailPage.jsx   → Detalhes do curso + aulas + sugestão IA

**Fluxo de uma requisição no frontend:**
Page (ex: DashboardPage)
→ Hook (ex: useCourses) — gerencia estado e chama a API
→ Facade (facade.js) — ponto central de acesso
→ Módulo de API (ex: courses.js) — função específica
→ Client (client.js) — axios com token JWT no header
→ Backend API

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Docker e Docker Compose
- Git

### Variáveis de ambiente

Copia o arquivo de exemplo:
```bash
cp .env.example .env
```

Preenche o `.env`:

```env
# Banco de dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=course_sphere_development

# JWT — gere uma chave segura com: openssl rand -hex 64
JWT_SECRET=sua_chave_secreta_aqui

# Gemini API — veja instruções abaixo
GEMINI_API_KEY=sua_chave_gemini_aqui
```

### Como obter o JWT_SECRET

Gere uma chave segura com:
```bash
openssl rand -hex 64
```

### Como obter a GEMINI_API_KEY

1. Acessa [aistudio.google.com](https://aistudio.google.com)
2. Faz login com sua conta Google
3. Clica em **Get API Key** → **Create API Key**
4. Copia a chave gerada e cola no `.env`

> O plano gratuito do Gemini tem limites de requisições por minuto e por dia. Se atingir o limite, a sugestão de descrição retorna `null` sem quebrar a aplicação.

---

## 🚀 Rodando Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/isaacteixeira06/DesafioFullStack.git
cd DesafioFullStack

# 2. Configure o .env
cp .env.example .env
# edite o .env com suas credenciais

# 3. Suba os containers
docker compose up --build

# 4. Popule o banco com dados de teste
docker compose exec api rails db:seed
```

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:3000`
- **Swagger:** `http://localhost:3000/api-docs`

---

## 👤 Usuários de Teste

| Nome | Email | Senha |
|---|---|---|
| Isaac Teixeira | isaac@example.com | 123456 |
| Maria Silva | maria@example.com | 123456 |

---

## 🧪 Rodando os Testes

```bash
docker compose exec \
  -e RAILS_ENV=test \
  -e DATABASE_URL=postgresql://postgres:postgres@db:5432/course_sphere_test \
  api bundle exec rspec
```

Os testes cobrem:
- Validações dos models (User, Course, Lesson)
- Fluxos de autenticação (registro, login, token inválido)
- Permissões de curso e aula (403 para usuários sem acesso)
- Filtro de aulas por status

---

## 📡 Endpoints da API

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

**Filtros:**
- `?search=nome` — busca cursos por nome
- `?status=draft` ou `?status=published` — filtra aulas por status

---

## 🔐 Autenticação

Todas as rotas protegidas exigem o header:
Authorization: Bearer <token>

O token JWT é retornado no login e no registro. Expira em 7 dias.
