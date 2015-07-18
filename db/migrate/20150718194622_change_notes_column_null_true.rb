class ChangeNotesColumnNullTrue < ActiveRecord::Migration
  def change
    change_column :transactions, :notes, :text, null: true
  end
end
