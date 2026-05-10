require 'rails_helper'

RSpec.describe 'Auth', type: :request do
  describe 'POST /api/v1/auth/register' do
    context 'com dados válidos' do
      it 'retorna token e usuário' do
        post '/api/v1/auth/register', params: {
          user: { name: 'Test User', email: 'test@example.com', password: '123456', password_confirmation: '123456' }
        }
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to include('token', 'user')
      end
    end

    context 'com email duplicado' do
      it 'retorna 422' do
        create(:user, email: 'test@example.com')
        post '/api/v1/auth/register', params: {
          user: { name: 'Test User', email: 'test@example.com', password: '123456', password_confirmation: '123456' }
        }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'POST /api/v1/auth/login' do
    let!(:user) { create(:user, email: 'test@example.com', password: '123456', password_confirmation: '123456') }

    context 'com credenciais válidas' do
      it 'retorna token' do
        post '/api/v1/auth/login', params: { email: 'test@example.com', password: '123456' }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to include('token')
      end
    end

    context 'com senha errada' do
      it 'retorna 401' do
        post '/api/v1/auth/login', params: { email: 'test@example.com', password: 'errada' }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end