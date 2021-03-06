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

ActiveRecord::Schema.define(version: 20150723154151) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.integer  "user_id",        null: false
    t.integer  "institution_id", null: false
    t.string   "account_type",   null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "identifier"
  end

  add_index "accounts", ["user_id"], name: "index_accounts_on_user_id", using: :btree

  create_table "alerts", force: :cascade do |t|
    t.integer  "account_id", null: false
    t.integer  "amount",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bills", force: :cascade do |t|
    t.integer  "amount",     null: false
    t.integer  "account_id", null: false
    t.date     "bill_date",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "budget_instructions", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "category",   null: false
    t.integer  "months",     null: false
    t.integer  "amount",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "budget_instructions", ["user_id", "category", "months"], name: "index_budget_instructions_on_user_id_and_category_and_months", unique: true, using: :btree

  create_table "budgets", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "category",   null: false
    t.float    "amount",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date     "start_date"
  end

  add_index "budgets", ["user_id", "category"], name: "index_budgets_on_user_id_and_category", unique: true, using: :btree

  create_table "institutions", force: :cascade do |t|
    t.string   "name",                   null: false
    t.integer  "api_id",     default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "institutions", ["name"], name: "index_institutions_on_name", unique: true, using: :btree

  create_table "transactions", force: :cascade do |t|
    t.integer  "account_id",       null: false
    t.integer  "amount",           null: false
    t.text     "description",      null: false
    t.date     "transaction_date", null: false
    t.text     "notes"
    t.string   "category",         null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "transactions", ["account_id"], name: "index_transactions_on_account_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",               null: false
    t.string   "email",              null: false
    t.string   "password_digest",    null: false
    t.string   "session_token",      null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "provider"
    t.string   "uid"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
