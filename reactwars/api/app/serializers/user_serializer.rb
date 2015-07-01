class UserSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :character, :meetup_access_token, :api_token, :onboarded, :meetup_member_id, :guild_color

  def nickname
    object.meetup_data['name'].split(' ').first
  end

  def character
    nil
  end

  def guild_color
    if object.guild.present?
      "rgb(#{object.guild.color})"
    end
  end

  def meetup_access_token
    object.meetup_token['access_token']
  end

  def onboarded
    object.guild.present?
  end
end
