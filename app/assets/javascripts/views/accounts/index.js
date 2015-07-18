SixthCents.Views.AccountsIndex = Backbone.CompositeView.extend({
  template: JST["accounts/index"],
  events: {
    "click .edit-accounts" : "editAccounts"
  },
  initialize: function(options){
    this.institutions = options.institutions;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.institutions, "sync add", this.render)
  },

  render: function(){
    var content = this.template({ accounts: this.collection });
    this.$el.html(content);

    this.addAccounts();

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
    var formView = new SixthCents.Views.EditAccountsView({ accounts: this.collection })

    this.addSubview(".modal-window", formView);

  }
})
