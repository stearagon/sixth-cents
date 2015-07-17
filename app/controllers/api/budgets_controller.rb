class Api::BudgetsController < ApplicationController
  before_action :require_log_in

  def index
    @budgets = current_user.budgets
    render json: @budgets
  end

  def create
    @budget = current_user.budget.new(budget_params)


    if @budget.save
      render json: @budget
    else
      render json: @budget.errors.full_messages, status: :unprocessable_entity;
    end
  end

  def show
    @budget = Budget.find(params[:id])

    if @budget
      render json: @budget
    else
      render json: @budget.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def budget_params
    params.require(:budget).permit(:category, :occurrence, :amount)
  end
end
