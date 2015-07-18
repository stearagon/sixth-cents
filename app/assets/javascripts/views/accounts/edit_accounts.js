SixthCents.Views.EditAccountsView = Backbone.CompositeView.extend({
  template: JST["accounts/edit_accounts"],
  initialize: function(options){
    this.accounts = options.accounts;
  },
  events: {
    "click button.add-account" : "newAccount",
  },
  render: function(){
    var content = this.template({ accounts: this.collection })

    this.$el.html(content);

    this.addInstitutionViews();

    return this;
  },
  newAccount: function() {
    var account = new SixthCents.Models.Account();
    var formView = new SixthCents.Views.FormView({ model: account, collection: this.accounts })
    debugger
    $(".edit-accounts-window").html("");
    this.addSubview(".edit-accounts-window", formView);

  },

  addInstitutionView: function(account, el){
    var accountItem = new SixthCents.Views.EditAccountItem({ model: account,
                                                        collection: this.accounts  });

    this.addSubview(el, accountItem);
  },

  addInstitutionViews: function() {
    var that = this;
    this.accounts.each(function(account){
      if($(".edit-accounts-window").find("." + account.institutionHyphen()).length === 0) {
        var newInst = $("<div>")
        newInst.addClass(account.institutionHyphen())
        newInst.addClass("sub-account-window")
        newInst.append("<h1>" + account.institution().get("name") + "</h1>")
        $(".edit-accounts-window").append(newInst)
      }
      var addToEl = "." + account.institutionHyphen()
      debugger

      that.addInstitutionView(account, addToEl)
    })
  },
})
