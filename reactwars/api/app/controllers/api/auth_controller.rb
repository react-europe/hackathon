class Api::AuthController < Api::BaseController
  skip_before_filter :validate_token, only: [:create]
  def create
    meetup_auth = Meetup::AuthToken.from_code(auth_params[:code])
    api = Meetup::ApiToken.new(meetup_auth.token.to_hash)
    @user = User.from_api_token(api.token)

    render json: @user
  end

  private

  def auth_params
    params.require(:auth).permit(
      :code,
      :expires_at
    )
  end
end
