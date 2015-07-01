class Api::BaseController < ApplicationController
  skip_before_filter :verify_authenticity_token

  respond_to :json

  private

  def current_user
    @current_user = User.find_by_api_token(params[:api_token])
  end

  def authenticated?
    current_user.present?
  end
end
