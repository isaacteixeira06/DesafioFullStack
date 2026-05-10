puts 'Limpando banco de dados...'
Lesson.destroy_all
Course.destroy_all
User.destroy_all

puts 'Criando usuários...'

user1 = User.create!(
  name: 'Isaac Teixeira',
  email: 'isaac@example.com',
  password: '123456',
  password_confirmation: '123456'
)

user2 = User.create!(
  name: 'Maria Silva',
  email: 'maria@example.com',
  password: '123456',
  password_confirmation: '123456'
)

puts 'Criando cursos...'

course1 = Course.create!(
  name: 'Introdução ao Ruby on Rails',
  description: 'Aprenda a construir aplicações web com Ruby on Rails do zero.',
  start_date: Date.today,
  end_date: Date.today + 90,
  creator: user1
)

course2 = Course.create!(
  name: 'React para Iniciantes',
  description: 'Construa interfaces modernas com React e hooks.',
  start_date: Date.today + 7,
  end_date: Date.today + 97,
  creator: user1
)

course3 = Course.create!(
  name: 'PostgreSQL na Prática',
  description: 'Domine o banco de dados relacional mais poderoso do mundo.',
  start_date: Date.today + 14,
  end_date: Date.today + 104,
  creator: user2
)

puts 'Criando aulas...'

Lesson.create!([
  { title: 'Configurando o ambiente', status: 'published', video_url: 'https://youtube.com/watch?v=001', course: course1 },
  { title: 'MVC no Rails', status: 'published', video_url: 'https://youtube.com/watch?v=002', course: course1 },
  { title: 'ActiveRecord básico', status: 'published', video_url: 'https://youtube.com/watch?v=003', course: course1 },
  { title: 'Rotas e Controllers', status: 'draft', course: course1 },
  { title: 'Introdução ao JSX', status: 'published', video_url: 'https://youtube.com/watch?v=004', course: course2 },
  { title: 'useState e useEffect', status: 'published', video_url: 'https://youtube.com/watch?v=005', course: course2 },
  { title: 'Componentes e Props', status: 'draft', course: course2 },
  { title: 'Instalação e configuração', status: 'published', video_url: 'https://youtube.com/watch?v=006', course: course3 },
  { title: 'Queries básicas', status: 'draft', course: course3 }
])

puts ''
puts '✅ Seeds criados com sucesso!'
puts ''
puts 'Usuários de teste:'
puts "  email: isaac@example.com | senha: 123456"
puts "  email: maria@example.com | senha: 123456"