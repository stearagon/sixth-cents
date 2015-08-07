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

  describe '#initialize' do
    subject(:account) { Account.new(user_id: 1, institution_id: 1, account_type: "Checking", identifier: "1435")}

    it "sets up an account correctly" do
      expect(account.user_id).to eq(1)
      expect(account.account_type).to eq("Checking")
      expect(account.institution_id).to eq(1)
      expect(account.identifier).to eq("1435")
    end

    it "raises an error with invalid account_type" do
      expect do
        Account.save(user_id: 1, institution_id: 1, account_type: "Wrong", identifier: "1435")
      end.to raise_error
    end

  end



end
