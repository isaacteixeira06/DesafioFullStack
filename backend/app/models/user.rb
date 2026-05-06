class User < ApplicationRecord
  has_secure_password

  has_many :courses, foreign_key: :creator_id, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP },
                    uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
end