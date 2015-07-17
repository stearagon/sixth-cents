class BudgetInstruxTable < ActiveRecord::Migration
  def change
    create_table :budget_instructions do |t|
      t.integer :user_id, null: false
            t.string :category, null: false
      t.integer :months, null: false
      t.integer :amount, null: false

      t.timestamps null: false
    end

    add_index :budget_instructions, [:user_id, :category, :months], unique: true
  end
end
