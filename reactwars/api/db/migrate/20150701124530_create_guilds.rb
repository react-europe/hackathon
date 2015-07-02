class CreateGuilds < ActiveRecord::Migration
  def change
    create_table :guilds do |t|
      t.integer :group_id
      t.string :color

      t.timestamps null: false
    end
  end
end
