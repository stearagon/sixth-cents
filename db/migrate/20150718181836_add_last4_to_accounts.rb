class AddLast4ToAccounts < ActiveRecord::Migration
  def change
    add_column :accounts, :identifier, :string, defaul: ""
  end
end
