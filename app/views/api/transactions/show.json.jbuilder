json.extract! @transaction, :id, :account_id, :amount, :description,
                            :transaction_date, :notes, :category
json.account @transaction.account, :account_type
