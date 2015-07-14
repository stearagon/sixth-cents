SixthCents.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "index"
  },

  initialize: function(options){
    this.accounts = options.accounts
    this.$rootEl = options.$rootEl;
  },

  index: function(){
    this.accounts.fetch();

    var indexView = new SixthCents.Views.AccountsIndex({ collection: this.accounts });

    this._swapView(indexView);
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
