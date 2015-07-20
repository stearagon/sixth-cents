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
#  identifier     :string
#

require 'rails_helper'

RSpec.describe Account, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
