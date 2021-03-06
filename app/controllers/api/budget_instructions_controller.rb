class Api::BudgetInstructionsController < ApplicationController
  # before_action :require_log_in

  def index
    @budget_instructions = current_user.budget_instructions
    render json: @budget_instructions
  end

  def create
    @budget_instruction = current_user.budget_instructions.new(budget_params)


    if @budget_instruction.save
      render json: @budget_instruction
    else
      render json: @budget_instruction.errors.full_messages, status: :unprocessable_entity;
    end
  end

  def show
    @budget_instruction = BudgetInstruction.find(params[:id])

    if @budget_instruction
      render json: @budget_instruction
    else
      render json: @budget_instruction.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @budget_instruction = BudgetInstruction.find(params[:id])

    if @budget_instruction.update(budget_params)
      render json: @budget_instruction
    else
      render json: @budget_instruction.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @budget_instructions= BudgetInstruction.find_by_id(params[:id])

    @budget_instruction.destroy

    render json: @budget_instruction

  end

  private

  def budget_params
    params.require(:budget_instruction).permit(:category, :months, :amount)
  end
end
