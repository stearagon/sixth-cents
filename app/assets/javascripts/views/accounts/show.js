SixthCents.Views.AccountShow = Backbone.CompositeView.extend({
  template: JST["accounts/show"],
  events: {
    "click .add-trans" : "createTransaction"
  },
  initialize: function(options){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTransaction);
    this.accounts = options.accounts;
  },
  render: function(){
    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);
    this.addTransactions();
    return this;
  },

  createTransaction: function(){
    var transaction = new SixthCents.Models.Transaction();
    var formView = new SixthCents.Views.TransactionFormView({ model: transaction, account: this.model, collection: this.collection })

    this.addSubview(".modal-window", formView);
  },

  addTransaction: function(transaction){
    var transactionItem = new SixthCents.Views.TransactionItem({ model: transaction });
    this.addSubview(".transactions-list", transactionItem);
  },

  addTransactions: function(){
      this.model.transactions().forEach(this.addTransaction.bind(this))
  }

})
