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

require 'rails_helper'

RSpec.describe Alert, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
