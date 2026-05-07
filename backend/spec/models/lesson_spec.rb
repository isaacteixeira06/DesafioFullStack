require 'rails_helper'

RSpec.describe Lesson, type: :model do
  describe 'validações' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:status) }
    it { should validate_length_of(:title).is_at_least(3) }
    it { should validate_inclusion_of(:status).in_array(%w[draft published]) }
    it { should belong_to(:course) }
  end

  describe 'video_url' do
    it 'é válido sem video_url' do
      lesson = build(:lesson, video_url: nil)
      expect(lesson).to be_valid
    end

    it 'é inválido com video_url sem formato de URL' do
      lesson = build(:lesson, video_url: 'nao-é-uma-url')
      expect(lesson).not_to be_valid
    end

    it 'é válido com video_url https' do
      lesson = build(:lesson, video_url: 'https://youtube.com/watch?v=123')
      expect(lesson).to be_valid
    end
  end
end