class SessionsController < ApplicationController

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
