class AddGroupIdOnUser < ActiveRecord::Migration
  def change
    add_column :users, :guild_id, :integer
    add_index :users, :guild_id
  end
end
