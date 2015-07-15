class Transaction < ActiveRecord::Base
  validates :account_id, :amount, :transaction_type, :description, :category,
            :transaction_date, :notes, presence: true

  belongs_to :account
  
end
