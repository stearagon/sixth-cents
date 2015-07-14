class Account < ActiveRecord::Base
  validates :user_id, :institution_id, :account_type, presence: true

  belongs_to :user, inverse_of: :accounts
  belongs_to :institution, inverse_of: :accounts
end
