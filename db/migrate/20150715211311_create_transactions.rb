class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :account_id, null: false
      t.integer :amount, null: false
      t.string :transaction_type, null: false
      t.text :description, null: false
      t.date :transaction_date, null: false
      t.text :notes, null: false
      t.string :category, null: false
      
      t.timestamps null: false
    end

    add_index :transactions, :account_id
  end
end
