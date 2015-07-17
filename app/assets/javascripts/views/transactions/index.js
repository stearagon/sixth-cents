SixthCents.Views.TransactionsIndex = Backbone.CompositeView.extend({
  template: JST["transactions/index"],

  initialize: function(options){
    this.listenTo(this.collection, "add sync", this.render);
    this.accounts = options.accounts;
  },
  render: function(){
    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);
    this.addTransactions();
    return this;
  },

  addTransaction: function(transaction){
    var transactionItem = new SixthCents.Views.TransactionItem({ model: transaction });
    this.addSubview(".transactions-list", transactionItem);
  },

  addTransactions: function(){
      this.collection.forEach(this.addTransaction.bind(this))
  }

})
