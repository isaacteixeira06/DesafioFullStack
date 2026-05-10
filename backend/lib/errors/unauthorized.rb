module Errors
  class Unauthorized < StandardError
    def initialize(msg = 'Não autorizado')
      super
    end
  end
end