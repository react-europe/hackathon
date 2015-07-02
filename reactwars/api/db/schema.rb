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

ActiveRecord::Schema.define(version: 20150701125248) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actions", force: :cascade do |t|
    t.string   "type"
    t.integer  "initiator_id"
    t.integer  "recipient_id"
    t.integer  "code"
    t.json     "meta"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "guilds", force: :cascade do |t|
    t.integer  "group_id"
    t.string   "color"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.json     "meetup_data"
  end

  create_table "users", force: :cascade do |t|
    t.json     "meetup_data"
    t.json     "meetup_token"
    t.integer  "meetup_member_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "api_token"
    t.integer  "guild_id"
  end

  add_index "users", ["api_token"], name: "index_users_on_api_token", using: :btree
  add_index "users", ["guild_id"], name: "index_users_on_guild_id", using: :btree
  add_index "users", ["meetup_member_id"], name: "index_users_on_meetup_member_id", using: :btree

end
