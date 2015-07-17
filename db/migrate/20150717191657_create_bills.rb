class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.integer :amount, null: false
      t.integer :account_id, null: false
      t.date :bill_date, null: false

      t.timestamps null: false
    end
  end
end
