SixthCents.Views.TrendsView = Backbone.CompositeView.extend({
  template: JST["trends/trends_view"],
  className: 'group',
  events: {
    "click .edit-accounts" : "editAccounts",
    "click .account-summary-head" : "collapseAccounts"
  },
  categoryNames: [
    "Auto Transport",
    "Bills & Utilities",
    "Business Servies",
    "Education",
    "Entertainment",
    "Fees & Charges",
    "Financial",
    "Food & Drinking",
    "Gift & Donations",
    "Health & Fitness",
    "Home",
    "Investments",
    "Kids",
    "Misc Expenses",
    "Personal Care",
    "Pets",
    "Shopping",
    "Taxes",
    "Transfer",
    "Travel"
  ],
  initialize: function(options){
    this.budgets = options.budgets;
    this.transactions = options.transactions;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.transactions, "sync", this.render);
  },

  render: function(){
    var debtData = this.debts();
    var content = this.template({ collection: this.getCategorySpending() , accounts: this.collection, debt: debtData });

    this.$el.html(content);

    return this;
  },

  categorySpend: function(categoryName){
    var currDate = new Date()
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate())
    var y = currDate.getFullYear(), m = (currDate.getMonth()), d = (currDate.getDate());
    var firstDay = new Date(y, m, d)
    var incomeAndSpend = { income: 0, spend: 0 }

    var date1 = Date.parse(firstDay) - 2592000000;
    var date2 = Date.parse(firstDay);


    var spendTotal = 0;
    this.transactions.each(function(transaction){
      var tdate = Date.parse(transaction.get("transaction_date"))
      if(tdate >= date1 && tdate < date2){
        if(transaction.get("category") === categoryName){
          spendTotal += parseInt(transaction.get("amount"))
        }
      }
    })

    return [categoryName, -spendTotal]

  },

  getCategorySpending: function(){
    var catData = [];
    this.categoryNames.forEach(function(catName){
      catData.push(this.categorySpend(catName))
    }.bind(this))
    debugger
    return catData;
  },
  debts: function(){
    return this.transactions.transactions_time_debt();
  }

})
