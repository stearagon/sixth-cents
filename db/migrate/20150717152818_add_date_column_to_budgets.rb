class AddDateColumnToBudgets < ActiveRecord::Migration
  def change
    add_column :budgets, :start_date, :date
    remove_column :budgets, :occurrence
  end
end
