# == Schema Information
#
# Table name: budgets
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  category   :string           not null
#  amount     :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  start_date :date
#

class Budget < ActiveRecord::Base
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

  validates :user_id, :category, :start_date, :amount, presence: true
  validates :category, inclusion: { in: CATEGORIES ,
  message: "%{value} is not a valid type" }

  belongs_to :user, inverse_of: :budgets

end
