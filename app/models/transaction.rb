# == Schema Information
#
# Table name: transactions
#
#  id               :integer          not null, primary key
#  account_id       :integer          not null
#  amount           :integer          not null
#  description      :text             not null
#  transaction_date :date             not null
#  notes            :text             not null
#  category         :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Transaction < ActiveRecord::Base
  validates :account_id, :amount, :description, :category,
            :transaction_date, :notes, presence: true
  validates :account, presence: true

  belongs_to :account, inverse_of: :transactions

end
