SixthCents.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "index",
    "/accounts/new" : "new",
    "/accounts/:id" : "show"
  },

  initialize: function(options){
    this.accounts = options.accounts
    this.$rootEl = options.$rootEl;
    this.$modalEl = options.$modalEl;
    this.institutions = options.institutions;
  },

  index: function(){
    this.accounts.fetch();

    var indexView = new SixthCents.Views.AccountsIndex({ collection: this.accounts, institutions: this.institutions });

    this._swapView(indexView);
  },

  new: function(){
    var account = new SixthCents.Models.Account()

    var formView = new SixthCents.Views.AccountForm({ model: account });

    this._swapView(formView);

  },
  show: function(id){
    debugger
    var account = this.accounts.getOrFetch(id);

    var showView = new SixthCents.Views.AccountShow({ model: account });

    this._swapView(showView);

  },
  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
