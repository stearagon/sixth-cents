SixthCents.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.accounts = options.accounts
    this.$rootEl = options.$rootEl;
    this.$modalEl = options.$modalEl;
    this.institutions = options.institutions;
    this.transactions = options.transactions;
    this.budgets = options.budgets;
    this.budgetInstructions = options.budgetInstructions;
    this.bills = options.bills;
  },
  
  routes: {
    "" : "index",
    "accounts" : "transactionsIndex",
    "accounts/:id" : "show",
    "budgets" : "budgetsIndex",
    "users/new" : "new",
    "users/:id" : "showUser",
    "session/new" : "signIn"
  },

  index: function(){
    this.accounts.fetch();
    this.bills.fetch();
    var indexView = new SixthCents.Views.AccountsIndex({ collection: this.accounts, institutions: this.institutions, bills: this.bills });

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
    this.transactions.fetch();

    var budgetsIndexView = new SixthCents.Views.BudgetsIndex({ collection: this.budgets, budgetInstructions: this.budgetInstructions , transactions: this.transactions });

    this._swapView(budgetsIndexView);

  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },


  // index: function(){
  //   var callback = this.index.bind(this);
  //   if (!this._requireSignedIn(callback)) { return; }
  //
  //   var indexView = new SixthCents.Views.UsersIndex({
  //     collection: this.users
  //   });
  //   this._swapView(indexView);
  // },

  new: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new this.collection.model();
    var formView = new SixthCents.Views.UsersForm({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  showUser: function(id){
    var callback = this.show.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }

    var model = this.collection.getOrFetch(id);
    var showView = new SixthCents.Views.UsersShow({
      model: model
    });
    this._swapView(showView);
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new SixthCents.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
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
    Backbone.history.navigate("", { trigger: true });
  }
})
