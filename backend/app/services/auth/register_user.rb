module Auth
  class RegisterUser
    def initialize(params)
      @params = params
    end

    def call
      user = User.new(@params)
      user.save!
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