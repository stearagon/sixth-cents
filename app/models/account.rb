# == Schema Information
#
# Table name: accounts
#
#  id             :integer          not null, primary key
#  user_id        :integer          not null
#  institution_id :integer          not null
#  account_type   :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Account < ActiveRecord::Base
  validates :user_id, :institution_id, :account_type, presence: true
  validates :institution, :user, presence: true
  validates :account_type, inclusion: { in: %w( Checking
                                                Savings
                                                Credit Card
                                                Loan
                                                Investment
                                                Property/Other
                                              ),
  message: "%{value} is not a valid type" }


  belongs_to :user, inverse_of: :accounts
  belongs_to :institution, inverse_of: :accounts
  has_many :transactions, inverse_of: :account

  def amount
    result = 0
    self.transactions.each do |transaction|
      result += transaction.amount
    end
    result
  end

end
