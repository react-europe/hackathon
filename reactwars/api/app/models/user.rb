class User < ActiveRecord::Base
  belongs_to :guild

  def self.from_api_token(token)
    api = Meetup::Api.new(token)
    meetup_data = api.me
    user = self.where(meetup_member_id: meetup_data['id']).first

    if (user.present?)
      user.update_attributes(meetup_token: token.to_hash)
    else
      user = self.create(
        meetup_token: token.to_hash,
        meetup_member_id: meetup_data['id'],
        meetup_data: meetup_data,
        api_token: SecureRandom.hex
      )
    end

    user
  end
end
