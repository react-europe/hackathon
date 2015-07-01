module Meetup
  class AuthToken < Token
    attr_accessor :token

    def initialize(token)
      @token = token
    end

    def self.from_code(code)
      self.new(
        client.auth_code.get_token(code, redirect_uri: Token::APP_REDIRECT_URI)
      )
    end

    def self.from_hash(token_hash)
      self.new(
        OAuth2::AccessToken.from_hash(client, token_hash)
      )
    end

    private

    def self.client_opts
      {
        site: 'https://secure.meetup.com',
        token_url: '/oauth2/access'
      }
    end
  end
end
