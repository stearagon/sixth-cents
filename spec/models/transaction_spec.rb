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

require 'rails_helper'

RSpec.describe Transaction, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
