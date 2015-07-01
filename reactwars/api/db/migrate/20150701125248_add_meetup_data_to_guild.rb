class AddMeetupDataToGuild < ActiveRecord::Migration
  def change
    add_column :guilds, :meetup_data, :json
  end
end
