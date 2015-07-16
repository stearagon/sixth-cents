class RemoveTypeFromTransaction < ActiveRecord::Migration
  def change
    remove_column :transactions, :transaction_type
  end
end
