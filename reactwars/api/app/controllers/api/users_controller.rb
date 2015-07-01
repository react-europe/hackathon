class Api::UsersController < Api::BaseController
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def assign_guild
    @user = User.find(params[:id])

    guild = Guild.find_by_group_id(params[:guild][:id])
    unless guild.present?
      guild = Guild.create({
        color: Guild.random_color,
        meetup_data: params[:guild],
        group_id: params[:guild][:id]
      })
    end

    @user.update_attributes(guild: guild)
    render json: @user
  end
end
