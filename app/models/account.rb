class Account < ActiveRecord::Base
  validates :user_id, :institution_id, :account_type, presence: true

  belongs_to :user
  belongs_to :institution
  
end
