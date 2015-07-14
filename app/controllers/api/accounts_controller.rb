class Api::AccountsController < ApplicationController
  before_action :require_log_in

  def index
    @accounts = current_user.accounts
    render json: @accounts
  end

  def show
    @account = Account.find(params[:id])

    if @account
      render json: @account
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity
    end
  end
end
