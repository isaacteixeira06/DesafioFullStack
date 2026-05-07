require 'rails_helper'

RSpec.describe User, type: :model do
    describe 'validações' do
        subject { build(:user) }
        it { should validate_presence_of(:name) }
        it { should validate_presence_of(:email) }
        it { should validate_uniqueness_of(:email).case_insensitive }
        it { should allow_value('test@example.com').for(:email) }
        it { should_not allow_value('invalido').for(:email) }
        it { should have_many(:courses).with_foreign_key(:creator_id).dependent(:destroy) }
    end
end