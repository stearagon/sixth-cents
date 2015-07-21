class Api::SessionsController < ApplicationController
  # skip_before_action :require_log_in, only: [:new, :create]
  # before_action :disable_sign_in_or_log_in, only: [:new, :create]


  def create
    user = User.find_by_user_credentials(params[:user][:email],
                                          params[:user][:password])

    if user
      login!(user)
      render :show
    else
      head :unprocessable_entity
    end

  end

  def show
    if current_user
      render :show
    else
      render json: {}
    end
  end

  def destroy
    logout!
    render json: {}
  end

end
