class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user 

  def login!(user)
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def current_user
    return nil if session[:session_token].nil?

    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def require_log_in
    redirect_to new_session_url if !logged_in?
  end

  def disable_sign_in_or_log_in
    redirect_to root_url if logged_in?
  end

end
