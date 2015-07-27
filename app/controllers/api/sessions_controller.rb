class Api::SessionsController < ApplicationController


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

  def omniauth
    user = User.find_or_create_by_auth_hash(auth_hash)
    login!(user)
    redirect_to "#"
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

end
