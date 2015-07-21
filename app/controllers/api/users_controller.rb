class Api::UsersController < ApplicationController
  # skip_before_action :require_log_in, only: [:new, :create]
  # before_action :disable_sign_in_or_log_in, only: [:new, :create]
  def new
    @user = User.new

    render :new
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end
