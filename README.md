# Sixth Cents
Sixth Cents is a clone of Mint.com, which is a personal finance management
website. With Sixth Cents, users can keep track of all of their financial accounts,
as well as related transactions and bills. Users can also create budgets to manage
their spending in different categories and keep track of their spending and debt over
time with the Trends page.

[Live Link][sitelink]

[sitelink]: http://www.sixthcents.co/

## Languages
- Ruby
- JavaScript
- HTML
- CSS

## Frameworks
- Rails
- Backbone

## Plugins/Other
- Highcharts.js
- paperclip
- AWS S3
- OmniAuth
- Spin.js

## Features

### Accounts
Sixth Cents allows users to keep track of all their financial accounts. For an
account, Users can record institution name (i.e. "Bank of America"), type of
account (i.e. "Checking") and a special identifier which can be the alst four
digits of the account number.

### Transactions
Users create transactions that are associated with specific accounts. These
transactions record the date, description, category, amount and any notes for
each transaction. After an account has been associated with transactions, users
can track balances in their accounts as well as balances by asset (i.e. Cash or
or Loans).

### Budgets
Users can create monthly budgets for specific categories. Once a budget is
created, the user can keep track of how much of the budget they have used. This
is represented as a bar chart that is colored three different colors. Green
represents under 50% of budget used. Yellow represents between 50% and 75%. And
red is 75% and over.

### Bills
Users can create a bill object that will be displayed on their landing page if
the bill is due within the next 28 days. The bill object has three attributes:
the account the bill is associated with, the date the bill is due and the amount
that is due.

### Trends
Users can view charts of how their finances have performed over time as well as
where their money is going.

### Twitter Omniauth
Users can login using their Twitter account as well as create a new account using
Twitter.

### Avatar Image Upload
When creating a new profile, a user can upload an avatar which is stored on Sixth
Cents Amazon S3 server.

## Future Todos
- [ ] Expanded Trend Charts Offering
- [ ] Create transactions by uploading csv file of transactions
- [ ] Pull transactions using bank api/third-party api
- [ ] Add tags to transactions
- [ ] Create goals
