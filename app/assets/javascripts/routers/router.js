SixthCents.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.accounts = options.accounts
    this.$rootEl = options.$rootEl;
    this.$modalEl = options.$modalEl;
    this.institutions = options.institutions;
    this.transactions = options.transactions;
    this.budgets = options.budgets;
    this.budgetInstructions = options.budgetInstructions;
  },
  routes: {
    "" : "index",
    "accounts" : "transactionsIndex",
    "accounts/:id" : "show",
    "budgets" : "budgetsIndex"
  },

  index: function(){
    this.accounts.fetch();

    var indexView = new SixthCents.Views.AccountsIndex({ collection: this.accounts});

    this._swapView(indexView);
  },

  show: function(id){
    this.accounts.fetch();
    this.transactions.fetch();

    var account = this.accounts.getOrFetch(id);

    var showView = new SixthCents.Views.AccountShow({ model: account, collection: this.transactions, accounts: this.accounts });

    this._swapView(showView);

  },

  transactionsIndex: function(){
    this.accounts.fetch();
    this.transactions.fetch();

    var transactionsIndexView = new SixthCents.Views.TransactionsIndex({ collection: this.transactions, accounts: this.accounts });

    this._swapView(transactionsIndexView);

  },

  budgetsIndex: function(){
    this.budgets.fetch();
    this.budgetInstructions.fetch();
    
    var budgetsIndexView = new SixthCents.Views.BudgetsIndex({ collection: this.budgets, budgetInstructions: this.budgetInstructions });

    this._swapView(budgetsIndexView);

  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
