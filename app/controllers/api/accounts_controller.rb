class AccountsController < ApplicationController
  def show
    @account = Account.find(params[:id])

    if @account
      render json: @account
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity
    end
  end

end
