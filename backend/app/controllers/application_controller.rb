class ApplicationController < ActionController::API
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from Errors::Forbidden, with: :forbidden
  rescue_from ActionController::ParameterMissing, with: :bad_request

  private

  def authenticate_user!
    user_id = request.env['current_user_id']
    @current_user = User.find_by(id: user_id)
    raise Errors::Unauthorized unless @current_user
  rescue Errors::Unauthorized
    render json: { error: 'Não autorizado' }, status: :unauthorized
  end

  def current_user
    @current_user
  end

  def not_found(e)
    render json: { error: e.message }, status: :not_found
  end

  def unprocessable_entity(e)
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def forbidden(e)
    render json: { error: e.message }, status: :forbidden
  end

  def bad_request(e)
    render json: { error: e.message }, status: :bad_request
  end
end