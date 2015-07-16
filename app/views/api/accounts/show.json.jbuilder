json.extract! @account, :id, :user_id, :institution_id, :account_type, :amount

json.institution do
  json.extract! @account.institution, :name, :id, :api_id
end

json.transactions do
  json.array! @account.transactions do |transaction|
    json.extract! transaction, :id, :account_id, :amount, :category, :transaction_type,
                                :notes, :transaction_date, :description
  end
end
