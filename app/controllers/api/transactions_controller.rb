class Api::TransactionsController < ApplicationController
  before_action :require_log_in

  def index
    @transactions = Transaction.find(params[:id])
    render json: @accounts
  end

  def create
    @transaction = current_user.accounts.find(params[:id]).transactions.new(transaction_params)

    if @transaction.save
      render json: @transaction
    else
      render json: @transaction.errors.full_messages, status: :unprocessable_entity;
    end
  end

  def show
    @transaction = Transaction.find(params[:id])

    if @transaction
      render json: @transaction
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:account_id, :amount, :transaction_type,
                                        :description, :category, :transaction_date, :notes)
  end
end
