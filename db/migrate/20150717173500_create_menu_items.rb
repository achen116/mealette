class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.references :restaurant, index: true, foreign_key: true
      t.string :title
      t.string :description
      t.string :img_url
      t.float :price
      t.float :item_rating

      t.timestamps null: false
    end
  end
end
