class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.integer :user_id, null: false
      t.integer :institution_id, null: false
      t.string :account_type, null: false

      t.timestamps null: false
    end

    add_index :accounts, :user_id
  end
end
