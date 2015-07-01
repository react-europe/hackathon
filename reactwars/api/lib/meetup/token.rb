module Meetup
  class Token
    APP_REDIRECT_URI = 'reactwars://callback'

    def self.client
      @client ||=
        OAuth2::Client.new(
          Rails.application.secrets.meetup_key,
          Rails.application.secrets.meetup_secret,
          client_opts
        )
    end

    private

    def client_opts
      raise NotImplementedError
    end
  end
end
