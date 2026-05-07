FactoryBot.define do
  factory :lesson do
    title { Faker::Educator.subject }
    status { 'draft' }
    video_url { 'https://youtube.com/watch?v=123' }
    association :course
  end
end