# == Schema Information
#
# Table name: institutions
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  api_id     :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Institution < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  # validates :api_id, presence: true currently have a default 0 value

  has_many :accounts, inverse_of: :institution
end
