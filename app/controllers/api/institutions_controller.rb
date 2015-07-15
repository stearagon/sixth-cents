class Api::InstitutionsController < ApplicationController
  before_action :require_log_in

  def index
    @institutions = current_user.institutions

    if @institutions
      render json: @institutions
    else
      render json: @institutions.errors.full_messages, status: :unprocessable_entity
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
end
