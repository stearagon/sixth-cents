# Sixth Cents (Mint Clone)

[Heroku link][heroku]

[heroku]: https://sixthcents.herokuapp.com/

## Minimum Viable Product
Sixth Cents is a clone of Mint built on Rails and Backbone. Users can:

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create financial accounts (bank, credit card, loan, investment, etc.)
- [ ] Create budgets
- [ ] View a feed of financial events (upcoming bills, transactions)
- [ ] Search transactions
- [ ] Email alerts (low balance, weekly snapshot of changes in financial condition)

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication and Accounts Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. Users can add accounts manually to the database. The most important 
part of this phase will be pushing the app to Heroku and ensuring that everything 
works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Viewing and Creating Account Transactions (~2 days)
I will add API routes to manually add transactions to accounts, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to add transactions to accounts and view all transactions by 
type, all inside a single Backbone app.

[Details][phase-two]

### Phase 3: Viewing and Creating Budgets (~2 days)
I will add API routes for users to add budgets to their account. Then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able view individual budgets as well as have summarized budget 
views on their landing page. 

[Details][phase-three]

### Phase 4: Transactions Search (~1 days)
I'll need to add `search` routes to transactions controller. On the
Backbone side, there will be a `SearchResults` composite view has `TransactionsIndex`
subviews. These views will use plain old `transactions`collections, but they will 
fetch from the new `search`routes.

[Details][phase-four]

### Phase 5: Connecting to Financial Institutions and Email alerts (~2-3 days)
I will use action emailer to alert users of different actiionable events such as bills
due or low account balances. I will look at third-party libraries to access bank account 
information for automated transaction downloads. Possible leads are GNU Cash which 
accesses information through Open Financial Exchange and Intuit which has an offering 
that might require payment. 

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Add tags to transactions
- [ ] Create goals
- [ ] View trends on financial status

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
