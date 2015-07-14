class User < ActiveRecord::Base
  validates :email, :name, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, presence: { length: 8, allow_nil: true }

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_user_credentials(email, password)
    user = User.find_by_email(email)
    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def reset_session_token
    self.session_token = self.class.generate_session_token
    self.save!
    return self.session_token
  end

  def is_password?(password)
    Bcrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = Bcrypt::Password.create(password)
  end

end
