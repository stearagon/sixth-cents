SixthCents.Views.EditAccountsView = Backbone.CompositeView.extend({
  template: JST["accounts/edit_accounts"],
  initialize: function(options){
    this.accounts = options.accounts;
    this.listenTo(this.accounts, "destroy sync", this.render)
  },
  events: {
    "click .add-account" : "newAccount",
    "click .close-edit" : "close"
  },
  render: function(){
    var content = this.template({ accounts: this.collection })

    this.$el.html(content);

    this.addInstitutionViews();

    return this;
  },
  newAccount: function() {
    $(".edit-accounts-modal").addClass("shrink");
    $(".edit-accounts-window").addClass("display-none");
    $(".edit-accounts-window-list").addClass("display-none");
    $(".close-edit").addClass("display-none");
    var account = new SixthCents.Models.Account();
    var formView = new SixthCents.Views.FormView({ model: account, collection: this.accounts })
    this.addSubview(".all-edit-accounts", formView);
    $(".modal-window.edit-accounts-modal").css({ overflow: 'hidden' })
  },
  close: function(){

    event.preventDefault();
    $("body").css({ overflow: "scroll"});
    $(".modal-window").removeClass("edit-accounts");
    $(".modal-window").addClass("display-none");
    $(".modal-window.edit-accounts-modal").css({ overflow: 'scroll' })
    this.remove();
  },

  addInstitutionView: function(account, el){
    var accountItem = new SixthCents.Views.EditAccountItem({ model: account,
                                                        collection: this.accounts  });

    this.addSubview(el, accountItem);
  },

  addInstitutionViews: function() {
    var that = this;
    this.accounts.each(function(account){
      if($(".edit-accounts-window-list").find("." + account.institutionHyphen()).length === 0) {
        var newInst = $("<div>")
        newInst.addClass(account.institutionHyphen())
        newInst.addClass("sub-account-window")
        newInst.append("<h2>" + account.institution().get("name") + "</h2>")
        $(".edit-accounts-window-list").append(newInst)
      }
      var addToEl = "." + account.institutionHyphen()


      that.addInstitutionView(account, addToEl)
    })
  },
})
