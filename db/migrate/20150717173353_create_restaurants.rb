class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :location
      t.float :latitude
      t.float :longitude
      t.float :restaurant_rating

      t.timestamps null: false
    end
  end
end
