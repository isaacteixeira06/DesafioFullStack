module External
  class AiSuggestionService
    API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent'.freeze

    def self.call(course_name)
      api_key = ENV.fetch('GEMINI_API_KEY')

      response = Faraday.post("#{API_URL}?key=#{api_key}") do |req|
        req.headers['Content-Type'] = 'application/json'
        req.body = {
          contents: [{
            parts: [{
              text: "Gere uma descrição resumida e profissional para um curso online chamado '#{course_name}'. 
                     Máximo 3 frases. Responda apenas com a descrição, sem títulos ou formatação extra."
            }]
          }]
        }.to_json
      end

      return nil unless response.success?

      data = JSON.parse(response.body)
      data.dig('candidates', 0, 'content', 'parts', 0, 'text')&.strip
    rescue StandardError
      nil
    end
  end
end