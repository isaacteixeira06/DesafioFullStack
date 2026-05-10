Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'auth/register', to: 'auth#register'
      post 'auth/login', to: 'auth#login'

      resources :courses, only: [:index, :show, :create, :update, :destroy] do
        collection do
          post :suggest_description
        end
        resources :lessons, only: [:index, :create, :update, :destroy]
      end
    end
  end
end