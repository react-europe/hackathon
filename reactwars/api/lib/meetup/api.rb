module Meetup
  class Api
    def initialize(token)
      @token = token
    end

    def me
      @me ||= query('/2/member/self')
    end

    private

    attr_accessor :token

    def query(path)
      JSON.parse(
        token.get(path).body
      )
    end
  end
end
