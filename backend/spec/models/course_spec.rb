require 'rails_helper'

RSpec.describe Course, type: :model do
  describe 'validações' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:start_date) }
    it { should validate_presence_of(:end_date) }
    it { should validate_length_of(:name).is_at_least(3) }
    it { should belong_to(:creator).class_name('User') }
    it { should have_many(:lessons).dependent(:destroy) }
  end

  describe 'end_date_after_start_date' do
    it 'é inválido quando end_date é anterior a start_date' do
      course = build(:course, start_date: Date.today, end_date: Date.today - 1)
      expect(course).not_to be_valid
      expect(course.errors[:end_date]).to include('deve ser igual ou posterior à data de início')
    end

    it 'é válido quando end_date é igual a start_date' do
      course = build(:course, start_date: Date.today, end_date: Date.today)
      expect(course).to be_valid
    end
  end
end