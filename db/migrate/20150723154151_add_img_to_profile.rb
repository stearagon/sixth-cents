class AddImgToProfile < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.attachment :image
    end
  end
end
