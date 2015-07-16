json.array! @accounts do |acct|
  json.extract! acct, :user_id, :institution_id, :account_type, :id, :amount
  json.institution acct.institution, :name, :api_id, :id
  json.transactions do |variable|
    json.array! acct.transactions do |transaction|
      json.extract! transaction, :id, :account_id, :amount, :category, :transaction_type,
                                :notes, :transaction_date, :description
    end
  end
end
