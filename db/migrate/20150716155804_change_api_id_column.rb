class ChangeApiIdColumn < ActiveRecord::Migration
  def change
    change_column :institutions, :api_id, :integer, :default => 0
  end
end
