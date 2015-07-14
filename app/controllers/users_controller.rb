

class UsersController < ApplicationController
  skip_before_action :require_log_in, only: [:new, :create]
  def new
    @user = User.new

    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])

    render :show
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end
