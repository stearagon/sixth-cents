SixthCents.Views.AccountsIndex = Backbone.CompositeView.extend({
  template: JST["accounts/index"],
  events: {
    "click #sidebar > button" : "newAccount"
  },
  initialize: function(options){
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function(){
    var content = this.template({ accounts: this.collection });
    this.$el.html(content);

    this.addAccounts();

    return this;
  },

  addAccount: function(account){
    debugger
    var accountItem = new SixthCents.Views.AccountItem({ model: account,
                                                        collection: this.collection  });
    var acctType = account.type();

    this.addSubview("." + acctType, accountItem);
  },

  addAccounts: function() {
    this.collection.each(this.addAccount.bind(this));
  },

  newAccount: function() {
    var account = new SixthCents.Models.Account();
    var formView = new SixthCents.Views.FormView({ model: account, collection: this.collection })

    this.addSubview(".modal-window", formView);

  }
})