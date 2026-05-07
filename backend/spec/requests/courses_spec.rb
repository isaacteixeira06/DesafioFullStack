require 'rails_helper'

RSpec.describe 'Courses', type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }
  let!(:course) { create(:course, creator: user) }
  let(:token) { JWT.encode({ user_id: user.id, exp: 7.days.from_now.to_i }, JWT_SECRET, 'HS256') }
  let(:other_token) { JWT.encode({ user_id: other_user.id, exp: 7.days.from_now.to_i }, JWT_SECRET, 'HS256') }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }
  let(:other_headers) { { 'Authorization' => "Bearer #{other_token}" } }

  describe 'GET /api/v1/courses' do
    it 'retorna lista de cursos autenticado' do
      get '/api/v1/courses', headers: headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)
    end

    it 'retorna 401 sem token' do
      get '/api/v1/courses'
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'POST /api/v1/courses' do
    context 'com dados válidos' do
      it 'cria curso e retorna 201' do
        post '/api/v1/courses', params: {
          course: { name: 'Novo Curso', start_date: Date.today, end_date: Date.today + 30 }
        }, headers: headers
        expect(response).to have_http_status(:created)
      end
    end

    context 'sem autenticação' do
      it 'retorna 401' do
        post '/api/v1/courses', params: {
          course: { name: 'Novo Curso', start_date: Date.today, end_date: Date.today + 30 }
        }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PATCH /api/v1/courses/:id' do
    it 'permite criador editar' do
      patch "/api/v1/courses/#{course.id}", params: {
        course: { name: 'Atualizado' }
      }, headers: headers
      expect(response).to have_http_status(:ok)
    end

    it 'retorna 403 para outro usuário' do
      patch "/api/v1/courses/#{course.id}", params: {
        course: { name: 'Tentativa' }
      }, headers: other_headers
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'DELETE /api/v1/courses/:id' do
    it 'permite criador deletar' do
      delete "/api/v1/courses/#{course.id}", headers: headers
      expect(response).to have_http_status(:no_content)
    end

    it 'retorna 403 para outro usuário' do
      delete "/api/v1/courses/#{course.id}", headers: other_headers
      expect(response).to have_http_status(:forbidden)
    end
  end
end