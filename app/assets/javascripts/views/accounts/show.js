SixthCents.Views.AccountShow = Backbone.CompositeView.extend({
  template: JST["accounts/show"],
  events: {
    "click .add-trans" : "createTransaction",
    "click .filter" : "filter",
    "dblclick .transactions-list-item" : "edit"
  },
  className: "group",
  initialize: function(options){
    // this.listenTo(this.collection, "add", this.addTransaction);
    this.accounts = options.accounts;
    this.listenTo(this.accounts, "sync add", this.render);
    this.listenTo(this.model, "sync add", this.render);
    this.listenTo(this.collection, "sync", this.addTransactions);
  },
  render: function(){
    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);
    this.addTransactions();
    return this;

  },

  createTransaction: function(){
    var transaction = new SixthCents.Models.Transaction();
    var account_id = this.model.get("id");
    var formView = new SixthCents.Views.TransactionFormView({ model: transaction, collection: this.collection, accounts: this.accounts, id: account_id })
    $(".modal-window-transaction").removeClass("display-none");
    $("body").css({ overflow: "hidden"});
    this.addSubview(".modal-window-transaction", formView);
  },

  addTransaction: function(transaction){
    var transactionItem = new SixthCents.Views.TransactionItem({ model: transaction });
    this.addSubview(".transactions-list", transactionItem);
  },

  addTransactions: function(){
      this.collection.forEach(this.addTransaction.bind(this))
  },
  filter: function(event){
    event.preventDefault();
    Backbone.history.navigate("accounts", {trigger: true})
    var clickTag =  $(event.currentTarget).data("value");
    $("#" + clickTag).click();
  },
  edit: function(event){
      $("body").css({ overflow: "hidden"});
      $(".modal-window-transaction").removeClass("display-none");
      var id = $(event.currentTarget).data("id")
      var transaction = this.collection.get(id);
      var formView = new SixthCents.Views.TransactionFormView({ model: transaction, collection: this.collection, accounts: this.accounts, id: "" })

      this.addSubview(".modal-window-transaction", formView);
    }
})
