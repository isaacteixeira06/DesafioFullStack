class Lesson < ApplicationRecord
  belongs_to :course

  STATUSES = %w[draft published].freeze

  validates :title, presence: true, length: { minimum: 3 }
  validates :status, presence: true, inclusion: { in: STATUSES }
  validates :video_url, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), message: 'deve ser uma URL válida' }, allow_blank: true

  scope :by_status, ->(status) { where(status: status) if status.present? }
end