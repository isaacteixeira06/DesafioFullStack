class JwtAuthenticator
  EXCLUDED_PATHS = [
    '/api/v1/auth/login',
    '/api/v1/auth/register'
  ].freeze

  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    if EXCLUDED_PATHS.include?(request.path)
      return @app.call(env)
    end

    token = extract_token(env)

    if token
      payload = decode_token(token)
      if payload
        env['current_user_id'] = payload['user_id']
        @app.call(env)
      else
        unauthorized_response
      end
    else
      unauthorized_response
    end
  end

  private

  def extract_token(env)
    auth_header = env['HTTP_AUTHORIZATION']
    return nil unless auth_header
    auth_header.split(' ').last
  end

  def decode_token(token)
    decoded = JWT.decode(token, JWT_SECRET, true, algorithm: 'HS256')
    decoded.first
  rescue JWT::DecodeError
    nil
  end

  def unauthorized_response
    [401, { 'Content-Type' => 'application/json' }, [{ error: 'Não autorizado' }.to_json]]
  end
end