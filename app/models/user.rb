# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :name, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, presence: { length: 8, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :accounts, -> { includes :institution }, inverse_of: :user
  has_many :transactions, through: :accounts, source: :transactions

  has_many :institutions, through: :accounts, source: :institution
  has_many :budgets, inverse_of: :user
  has_many :budget_instructions, inverse_of: :user

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_user_credentials(email, password)
    user = User.find_by_email(email)
    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    return self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def cash

  end

  def loans

  end

  def assets

  end

  def credit_card_debt

  end

  def month_spend(month)

  end

  def month_income(month)

  end

  

end
