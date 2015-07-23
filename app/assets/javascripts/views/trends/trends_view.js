SixthCents.Views.TrendsView = Backbone.CompositeView.extend({
  template: JST["trends/trends_view"],
  className: 'group',
  events: {
    "click .edit-accounts" : "editAccounts",
    "click .account-summary-head" : "collapseAccounts"
  },
  initialize: function(options){

    this.institutions = options.institutions;
    this.bills = options.bills;
    this.budgets = options.budgets;
    this.transactions = options.transactions;
    this.listenTo(this.collection, "sync destroy", this.render);
    this.listenTo(this.institutions, "sync add", this.render);
    this.listenTo(this.budgets, "sync add", this.render);
    this.listenTo(this.transactions, "sync", this.render);
  },

  render: function(){

    var content = this.template({ accounts: this.collection });
    this.$el.html(content);

    this.addAccounts();
    this.addBillsView();
    this.addBudgets();

    return this;
  },

  addAccount: function(account){

    var accountItem = new SixthCents.Views.AccountItem({ model: account,
                                                        collection: this.collection  });
    var acctType = account.type();

    this.addSubview("." + acctType, accountItem);

  },

  addAccounts: function() {
    this.collection.each(this.addAccount.bind(this));
  },

  editAccounts: function(event) {
    event.preventDefault();

    var formView = new SixthCents.Views.EditAccountsView({ accounts: this.collection });
    $(".modal-window").removeClass("display-none");
    $(".modal-window").addClass("edit-accounts-modal");
    $("body").css({ overflow: "hidden"});
    this.addSubview(".modal-window", formView);

  },
  addBillsView: function(){

    var billsView = new SixthCents.Views.BillsView({ collection: this.bills, accounts: this.collection });

    this.addSubview(".bills", billsView)
  },
  collapseAccounts: function(event){
    $(event.currentTarget.nextSibling.nextSibling).toggleClass("display-none")
    $($(event.currentTarget).children()[0]).toggleClass("display-none")
    $($(event.currentTarget).children()[1]).toggleClass("display-none")
  },
  addBudgets: function(){

    this.budgets.each(this.addBudget.bind(this));
  },

  addBudget: function(budget){
    var currDate = new Date()
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate())
    var y = currDate.getFullYear(), m = (currDate.getMonth())
    var firstDay = new Date(y, m, 0)
    var lastDay = new Date(y, m + 1, 0)
    var incomeAndSpend = { income: 0, spend: 0 }

    var date1 = Date.parse(firstDay)
    var date2 = Date.parse(lastDay)

    var spendTotal = 0;

    this.transactions.each(function(transaction){
      var tdate = Date.parse(transaction.get("transaction_date"))
      if(tdate >= date1 && tdate < date2){
        if(transaction.get("category") === budget.get("category")){
          spendTotal += parseInt(transaction.get("amount"))
        }
      }
    })
    if (budget.get("category") === "Income"){
      spendTotal = parseInt(spendTotal);

      var budgetsView = new SixthCents.Views.BudgetItem({ model: budget, total: spendTotal });

      this.addSubview(".budgets", budgetsView, "prepend")
    } else {
      spendTotal = parseInt(spendTotal) * -1;

      var budgetsView = new SixthCents.Views.BudgetItem({ model: budget, total: spendTotal });

      this.addSubview(".budgets", budgetsView)

    }


  }
})
