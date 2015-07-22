SixthCents.Views.AccountsIndex = Backbone.CompositeView.extend({
  template: JST["accounts/index"],
  className: 'group',
  events: {
    "click .edit-accounts" : "editAccounts",
    "click .account-summary-head" : "collapseAccounts"
  },
  initialize: function(options){

    this.institutions = options.institutions;
    this.bills = options.bills;
    this.listenTo(this.collection, "sync destroy", this.render);
    this.listenTo(this.institutions, "sync add", this.render)
  },

  render: function(){

    var content = this.template({ accounts: this.collection });
    this.$el.html(content);

    this.addAccounts();
    this.addBillsView();

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
  }
})
