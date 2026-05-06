module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_user!, only: [:login, :register]

      def register
        result = Auth::RegisterUser.new(register_params).call
        render json: {
          token: result[:token],
          user: user_json(result[:user])
        }, status: :created
      end

      def login
        result = Auth::LoginUser.new(params[:email], params[:password]).call
        render json: {
          token: result[:token],
          user: user_json(result[:user])
        }
      rescue Errors::Unauthorized => e
        render json: { error: e.message }, status: :unauthorized
      end

      private

      def register_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end

      def user_json(user)
        { id: user.id, name: user.name, email: user.email }
      end
    end
  end
end