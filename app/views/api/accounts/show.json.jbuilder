json.extract! @account, :id, :user_id, :institution_id, :account_type

json.institution do
  json.extract! @account.institution, :name, :id, :api_id
end
