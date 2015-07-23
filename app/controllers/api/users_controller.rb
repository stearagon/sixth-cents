class Api::UsersController < ApplicationController
  # skip_before_action :require_log_in, only: [:new, :create]
  # before_action :disable_sign_in_or_log_in, only: [:new, :create]
  wrap_parameters false

  def new
    @user = User.new

    render :new
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :image)
  end

end
