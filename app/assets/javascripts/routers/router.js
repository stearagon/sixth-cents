SixthCents.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.accounts = options.accounts
    this.$rootEl = options.$rootEl;
    this.$modalEl = options.$modalEl;
    this.institutions = options.institutions;
    this.transactions = options.transactions;
  },
  routes: {
    "" : "index",
    "accounts" : "showAll",
    "accounts/:id" : "show"
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
  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
