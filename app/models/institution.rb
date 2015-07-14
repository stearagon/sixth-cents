class Institution < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :api_id, presence: true

  
end
