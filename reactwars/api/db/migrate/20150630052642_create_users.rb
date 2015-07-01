class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.json :meetup_data
      t.json :meetup_token
      t.integer :meetup_member_id

      t.timestamps null: false
    end

    add_index :users, :meetup_member_id
  end
end
