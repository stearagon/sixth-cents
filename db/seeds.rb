User.create(name: "Steve Aragon", email: "steve@example.com", password: "secretss")
Institution.create(name: "Bank Of America", api_id: 1)
Institution.create(name: "Citibank", api_id: 2)
Institution.create(name: "Schwab Bank", api_id: 3)
Institution.create(name: "Chase Bank", api_id: 3)
Institution.create(name: "Long Island Credit Union", api_id: 3)
Institution.create(name: "ING", api_id: 3)
Institution.create(name: "Apple Bank", api_id: 3)
Institution.create(name: "Stonybrook Vaults", api_id: 3)
Account.create(user_id: 1, institution_id: 1, account_type: "Checking", identifier: "4538")
Account.create(user_id: 1, institution_id: 2, account_type: "Checking", identifier: "4864")
Account.create(user_id: 1, institution_id: 3, account_type: "Checking", identifier: "3468")
Account.create(user_id: 1, institution_id: 4, account_type: "Credit Card", identifier: "1302")
Account.create(user_id: 1, institution_id: 6, account_type: "Credit Card", identifier: "4526")
Account.create(user_id: 1, institution_id: 7, account_type: "Savings", identifier: "9106")
Account.create(user_id: 1, institution_id: 8, account_type: "Loan", identifier: "3942")
Account.create(user_id: 1, institution_id: 3, account_type: "Investment", identifier: "6662")


categories = ["Auto Transport",
              "Bills & Utilities",
              "Business Servies",
              "Education",
              "Entertainment",
              "Food & Drinking",
              "Gift & Donations",
              "Health & Fitness",
              "Home",
              "Kids",
              "Misc Expenses",
              "Personal Care",
              "Pets",
              "Shopping",
              "Taxes",
              "Transfer",
              "Travel"
            ]

i = 1
while i < 6 do
  j = 0
  while j < 20
    cat_num = rand(categories.length)
    category = categories[cat_num]
    amount = -(rand(1000))
    description = Faker::Company.name
    date = Faker::Date.backward(180)
    notes = Faker::Lorem.word

    Transaction.create( account_id: i, category: category, amount: amount, description: description,
      transaction_date: date, notes: notes)
    j+=1
  end
  i+=1
end

i = 1
while i < 4 do
  j = 0
  while j < 6
    category = "Income"
    amount = (rand(10000))
    description = "Work Paycheck"
    date = Faker::Date.backward(180)
    notes = Faker::Lorem.word

    Transaction.create( account_id: i, category: category, amount: amount, description: description,
      transaction_date: date, notes: notes)
    j+=1
  end
  i+=1
end

i = 6
  j = 0
  while j < 6
    category = "Investments"
    amount = (rand(5000))
    description = "Deposit"
    date = Faker::Date.backward(180)
    notes = Faker::Lorem.word

    Transaction.create( account_id: i, category: category, amount: amount, description: description,
      transaction_date: date, notes: notes)

    Transaction.create( account_id: 1, category: category, amount: -amount, description: "Transer to Savings",
    transaction_date: date, notes: notes)
    j+=1
  end

  i = 7
    j = 0
    while j < 2
      category = "Financial"
      amount = -(rand(5000))
      description = "Loan"
      date = Faker::Date.backward(180)
      notes = Faker::Lorem.word

      Transaction.create( account_id: i, category: category, amount: amount, description: description,
        transaction_date: date, notes: notes)
      j+=1
    end

    i = 8
      j = 0
      while j < 4
        category = "Investments"
        amount = (rand(5000))
        description = "Stock Purchase"
        date = Faker::Date.backward(180)
        notes = Faker::Lorem.word

        Transaction.create( account_id: i, category: category, amount: amount, description: description,
          transaction_date: date, notes: notes)

        Transaction.create( account_id: 2, category: category, amount: -amount, description: "Transer to Invesment Account",
        transaction_date: date, notes: notes)
        j+=1
      end

  categories.each do |category|
    user_id = 1
    amount = (rand(1500))
    BudgetInstruction.create( user_id: user_id, category: category, amount: amount, months: 1)
  end

  user_id = 1
  amount = (10000)
  BudgetInstruction.create( user_id: user_id, category: "Income", amount: amount, months: 1)

  account_id = 4
  i = 0
  while i < 4
    date = Faker::Date.forward(30)
    amount = rand(1000)
    Bill.create(account_id: account_id, amount: amount, bill_date: date)
    i+=1
  end

  account_id = 5
  i = 0
  while i < 4
    date = Faker::Date.forward(30)
    amount = rand(1000)
    Bill.create(account_id: account_id, amount: amount, bill_date: date)
    i+=1
  end

  account_id = 7
  i = 0
  while i < 4
    date = Faker::Date.forward(30)
    amount = rand(1000)
    Bill.create(account_id: account_id, amount: amount, bill_date: date)
    i+=1
  end
