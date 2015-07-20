class Api::BillsController < ApplicationController
  before_action :require_log_in

  def index
    @bills = current_user.bills
    render json: @bills
  end

  def create
    @bill = current_user.bills.new(bill_params)

    if @bill.save
      render json: @bill
    else
      render json: @bill.errors.full_messages, status: :unprocessable_entity;
    end
  end

  def show
    @bill = Bill.find(params[:id])

    if @bill
      render json: @bill
    else
      render json: @bill.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def bill_params
    params.require(:bill).permit(:account_id, :bill_date, :amount)
  end
end
