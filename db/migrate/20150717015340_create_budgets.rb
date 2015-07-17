class CreateBudgets < ActiveRecord::Migration
  def change
    create_table :budgets do |t|
      t.integer :user_id, null: false
      t.string :category, null: false
      t.string :occurence, null: false
      t.float :amount, null: false


      t.timestamps null: false
    end

    add_index :budgets, [:user_id, :category], unique: true
  end
end
