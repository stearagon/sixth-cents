# == Schema Information
#
# Table name: budgets
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  category   :string           not null
#  occurrence :string           not null
#  amount     :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Budget, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
