FactoryBot.define do
  factory :course do
    name { Faker::Educator.course_name }
    description { Faker::Lorem.paragraph }
    start_date { Date.today }
    end_date { Date.today + 30 }
    association :creator, factory: :user
  end
end