# == Schema Information
#
# Table name: transactions
#
#  id               :integer          not null, primary key
#  account_id       :integer          not null
#  amount           :integer          not null
#  description      :text             not null
#  transaction_date :date             not null
#  notes            :text
#  category         :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Transaction < ActiveRecord::Base
  CATEGORIES = ["Auto Transport",
                "Bills & Utilities",
                "Business Servies",
                "Education",
                "Entertainment",
                "Fees & Charges",
                "Financial",
                "Food & Drinking",
                "Gift & Donations",
                "Health & Fitness",
                "Home",
                "Income",
                "Investments",
                "Kids",
                "Misc Expenses",
                "Personal Care",
                "Repay Debt",
                "Pets",
                "Shopping",
                "Taxes",
                "Transfer",
                "Travel"
              ]
  validates :account_id, :amount, :description, :category,
            :transaction_date, presence: true
  validates :category, inclusion: { in: CATEGORIES ,
            message: "%{value} is not a valid type" }
  validates :account, presence: true

  belongs_to :account, inverse_of: :transactions

end
