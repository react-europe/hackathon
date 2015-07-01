module Meetup
  class ApiToken < Token
    attr_accessor :token

    def initialize(token_hash)
      @token_hash = token_hash
      @token = OAuth2::AccessToken.from_hash(
        ApiToken::client,
        @token_hash
      )
    end

    private

    def self.client_opts
      { site: 'https://api.meetup.com' }
    end
  end
end
