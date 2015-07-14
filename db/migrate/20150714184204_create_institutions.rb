class CreateInstitutions < ActiveRecord::Migration
  def change
    create_table :institutions do |t|
      t.string :name, null: false
      t.integer :api_id

      t.timestamps null: false
    end

    add_index :institutions, :name, unique: true
  end
end
