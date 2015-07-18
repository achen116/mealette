class CreateItemReviews < ActiveRecord::Migration
  def change
    create_table :item_reviews do |t|
      t.references :menu_item, index: true, foreign_key: true
      t.string :content

      t.timestamps null: false
    end
  end
end
