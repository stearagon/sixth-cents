SixthCents.Views.AccountsIndex = Backbone.CompositeView.extend({
  template: JST["accounts/index"],
  initialize: function(){
    this.listenTo(this.collection, "sync", this.addAccounts);
  },

  render: function(){
    var content = this.template({ accounts: this.collection });

    this.$el.html(content);

    this.addAccounts();

    return this;
  },

  addAccount: function(account){
    debugger
    var accountItem = new SixthCents.Views.AccountItem({ model: account });
    this.addSubview(".accounts-list", accountItem);
  },

  addAccounts: function() {
    this.collection.each(this.addAccount.bind(this))
  }
})
