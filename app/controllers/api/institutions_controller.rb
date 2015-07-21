class Api::InstitutionsController < ApplicationController
  # before_action :require_log_in

  def index
    @institutions = Institution.all

    if @institutions
      render json: @institutions
    else
      render json: @institutions.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create
    @institution = Institution.new(institution_params)


    if @institution.save
      render json: @institution
    else
      render json: @institution.errors.full_messages, status: :unprocessable_entity;
    end
  end


  def show
    @institution = Institution.find(params[:id])

    if @institution
      render :show
    else
      render json: @institution.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def institution_params
    params.require(:institution).permit(:name)
  end
end
