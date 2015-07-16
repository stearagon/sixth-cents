json.array! @accounts do |acct|
  json.extract! acct, :user_id, :institution_id, :account_type, :id
  json.institution acct.institution, :name, :api_id, :id
end
