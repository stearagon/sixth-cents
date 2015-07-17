class CreateAlerts < ActiveRecord::Migration
  def change
    create_table :alerts do |t|
      t.integer :account_id, null: false
      t.integer :amount, null: false

      t.timestamps null: false
    end
  end
end
