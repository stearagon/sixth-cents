class SessionsController < ApplicationController
  skip_before_action :require_log_in, only: [:new, :create]
  before_action :disable_sign_in_or_log_in, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(email: params[:user][:email])
    user = User.find_by_user_credentials(params[:user][:email],
                                          params[:user][:password])

    if user
      login!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end

  end

  def destroy
    logout!
    redirect_to new_session_url
  end

end
