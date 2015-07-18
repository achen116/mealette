# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150717173701) do

  create_table "item_reviews", force: :cascade do |t|
    t.integer  "menu_item_id"
    t.string   "content"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "item_reviews", ["menu_item_id"], name: "index_item_reviews_on_menu_item_id"

  create_table "menu_items", force: :cascade do |t|
    t.integer  "restaurant_id"
    t.string   "title"
    t.string   "description"
    t.string   "img_url"
    t.float    "price"
    t.float    "item_rating"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "menu_items", ["restaurant_id"], name: "index_menu_items_on_restaurant_id"

  create_table "restaurants", force: :cascade do |t|
    t.string   "name"
    t.string   "location"
    t.float    "latitude"
    t.float    "longitude"
    t.float    "restaurant_rating"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

end
