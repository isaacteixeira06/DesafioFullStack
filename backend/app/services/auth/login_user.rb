module Auth
  class LoginUser
    def initialize(email, password)
      @email = email
      @password = password
    end

    def call
      user = User.find_by(email: @email.downcase)
      raise Errors::Unauthorized, 'Email ou senha inválidos' unless user&.authenticate(@password)
      token = generate_token(user.id)
      { user: user, token: token }
    end

    private

    def generate_token(user_id)
      payload = { user_id: user_id, exp: 7.days.from_now.to_i }
      JWT.encode(payload, JWT_SECRET, 'HS256')
    end
  end
end