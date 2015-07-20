# == Schema Information
#
# Table name: alerts
#
#  id         :integer          not null, primary key
#  account_id :integer          not null
#  amount     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Alert < ActiveRecord::Base
end
