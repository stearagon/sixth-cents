# == Schema Information
#
# Table name: bills
#
#  id         :integer          not null, primary key
#  amount     :integer          not null
#  account_id :integer          not null
#  bill_date  :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Bill < ActiveRecord::Base
end
