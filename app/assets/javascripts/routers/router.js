SixthCents.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.institutions = SixthCents.Collections.institutions;
    this.accounts = SixthCents.Collections.accounts;
    this.transactions = SixthCents.Collections.transactions;
    this.budgets = SixthCents.Collections.budgets;
    this.budgetInstructions = SixthCents.Collections.budgetInstructions;
    this.bills = SixthCents.Collections.bills;
    this.$rootEl = options.$rootEl;
    this.$modalEl = options.$modalEl;
  },

  routes: {
    "start" : "index",
    "accounts" : "transactionsIndex",
    "accounts/:id" : "show",
    "budgets" : "budgetsIndex",
    "users/new" : "new",
    "session/new" : "signIn",
    "" : "splash",
    "trends" : "trends"
  },

  index: function(){
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    this.accounts.fetch();
    this.bills.fetch();
    this.transactions.fetch();
    this.institutions.fetch();
    this.budgetInstructions.fetch();
    var indexView = new SixthCents.Views.AccountsIndex({ collection: this.accounts, institutions: this.institutions, bills: this.bills, budgets: this.budgetInstructions, transactions: this.transactions });

    this._swapView(indexView);
  },

  show: function(id){
    var callback = this.show.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    this.accounts.fetch();
    this.transactions.fetch();
    var account = this.accounts.getOrFetch(id);

    var showView = new SixthCents.Views.AccountShow({ model: account, accounts: this.accounts, collection: account.transactions() });

    this._swapView(showView);
  },

  transactionsIndex: function(){

    var callback = this.transactionsIndex.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    this.accounts.fetch();
    this.transactions.fetch();

    var transactionsIndexView = new SixthCents.Views.TransactionsIndex({ collection: this.transactions, accounts: this.accounts });

    this._swapView(transactionsIndexView);

  },

  budgetsIndex: function(){
    var callback = this.budgetsIndex.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    this.budgets.fetch();
    this.budgetInstructions.fetch();
    this.transactions.fetch();

    var budgetsIndexView = new SixthCents.Views.BudgetsIndex({ collection: this.budgets, budgetInstructions: this.budgetInstructions , transactions: this.transactions });

    this._swapView(budgetsIndexView);

  },

  trends: function(){
    var callback = this.trends.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    this.accounts.fetch();
    this.bills.fetch();
    this.transactions.fetch();
    this.institutions.fetch();
    this.budgetInstructions.fetch();
    var trendsView = new SixthCents.Views.TrendsView({ collection: this.accounts, institutions: this.institutions, bills: this.bills, budgets: this.budgetInstructions, transactions: this.transactions });

    this._swapView(trendsView);

  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  new: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new SixthCents.Models.User();
    var formView = new SixthCents.Views.UsersForm({
      model: model
    });
    this._swapView(formView);
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new SixthCents.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  splash: function(callback){

    if (!this._requireSignedOut(this._goHome.bind(this))) { return; }

    var splashView = new SixthCents.Views.Splash();

    this._swapView(splashView);
  },

  _requireSignedIn: function(callback){

    if (!SixthCents.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },
  _requireSignedOut: function(callback){
    if (SixthCents.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("start", { trigger: true });
  }
})
