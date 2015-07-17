# == Schema Information
#
# Table name: budget_instructions
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  category   :string           not null
#  months     :integer          not null
#  amount     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BudgetInstruction < ActiveRecord::Base
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
                "Pets",
                "Shopping",
                "Taxes",
                "Transfer",
                "Travel"
              ]

  validates :user_id, :category, :months, :amount, presence: true
  validates :category, inclusion: { in: CATEGORIES ,
  message: "%{value} is not a valid type" }

  belongs_to :user, inverse_of: :budget_instructions

end
