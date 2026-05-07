require 'rails_helper'

RSpec.describe 'Lessons', type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }
  let!(:course) { create(:course, creator: user) }
  let!(:lesson) { create(:lesson, course: course) }
  let(:token) { JWT.encode({ user_id: user.id, exp: 7.days.from_now.to_i }, JWT_SECRET, 'HS256') }
  let(:other_token) { JWT.encode({ user_id: other_user.id, exp: 7.days.from_now.to_i }, JWT_SECRET, 'HS256') }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }
  let(:other_headers) { { 'Authorization' => "Bearer #{other_token}" } }

  describe 'GET /api/v1/courses/:course_id/lessons' do
    it 'retorna lista de aulas' do
      get "/api/v1/courses/#{course.id}/lessons", headers: headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)
    end

    it 'filtra por status' do
      get "/api/v1/courses/#{course.id}/lessons?status=draft", headers: headers
      expect(response).to have_http_status(:ok)
      lessons = JSON.parse(response.body)
      expect(lessons.all? { |l| l['status'] == 'draft' }).to be true
    end
  end

  describe 'POST /api/v1/courses/:course_id/lessons' do
    it 'cria aula como criador do curso' do
      post "/api/v1/courses/#{course.id}/lessons", params: {
        lesson: { title: 'Nova Aula', status: 'draft' }
      }, headers: headers
      expect(response).to have_http_status(:created)
    end

    it 'retorna 403 para outro usuário' do
      post "/api/v1/courses/#{course.id}/lessons", params: {
        lesson: { title: 'Nova Aula', status: 'draft' }
      }, headers: other_headers
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'DELETE /api/v1/courses/:course_id/lessons/:id' do
    it 'permite criador deletar aula' do
      delete "/api/v1/courses/#{course.id}/lessons/#{lesson.id}", headers: headers
      expect(response).to have_http_status(:no_content)
    end

    it 'retorna 403 para outro usuário' do
      delete "/api/v1/courses/#{course.id}/lessons/#{lesson.id}", headers: other_headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end