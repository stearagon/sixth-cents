class Institution < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :api_id, presence: true

  has_many :accounts
end
