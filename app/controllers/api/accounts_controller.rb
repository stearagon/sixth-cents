class Api::AccountsController < ApplicationController
  before_action :require_log_in

  def index
    @accounts = current_user.accounts
    render :index
  end

  def create
    @account = current_user.accounts.new(account_params)

    if @account.save
      render :show
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity;
    end
  end

  def show
    @account = Account.includes(:institution).find(params[:id])

    if @account
      render :show
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params.require(:account).permit(:institution_id, :account_type)
  end
end
