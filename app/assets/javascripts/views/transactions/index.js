SixthCents.Views.TransactionsIndex = Backbone.CompositeView.extend({
  template: JST["transactions/index"],
  events: {
    "click .add-trans" : "createTransaction",
    "click .filter" : "filter"
  },
  className: "group",
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
  },
  createTransaction: function(){
    $("body").css({ overflow: "hidden"});
    $(".modal-window").removeClass("display-none");
    var transaction = new SixthCents.Models.Transaction();
    var formView = new SixthCents.Views.TransactionFormView({ model: transaction, collection: this.collection, accounts: this.accounts, id: "" })

    this.addSubview(".modal-window", formView);
  },
  filter: function(event){
    event.preventDefault();
    var that = this;

    if(that.collection.length > 0){
      if($(event.currentTarget).data("value") === "cash-credit"){
        that.collection = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Checking" || transaction._accountType.account_type === "Credit Card"
        })
      } else if($(event.currentTarget).data("value") === "investment"){
        that.collection = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Savings" || transaction._accountType.account_type === "Investment"
        })
      } else if($(event.currentTarget).data("value") === "loan"){
        that.collection = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Loan"
        })
      }
    }

    this.render();
    this.collection = new SixthCents.Collections.Transactions();
    this.collection.fetch();
  }

})
