module Errors
  class Forbidden < StandardError
    def initialize(msg = 'Acesso negado')
      super
    end
  end
end