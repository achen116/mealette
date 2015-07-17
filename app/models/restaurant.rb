class Restaurant < ActiveRecord::Base
	has_many :menu_items
end
