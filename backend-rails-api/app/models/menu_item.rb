class MenuItem < ActiveRecord::Base
  belongs_to :restaurant
  has_many   :item_reviews
end
