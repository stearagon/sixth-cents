SixthCents.Views.TransactionsIndex = Backbone.CompositeView.extend({
  template: JST["transactions/index"],
  events: {
    "click .add-trans" : "createTransaction",
    "click .filter" : "filter",
    "click .sidebar-account-title" : "refresh"
  },
  className: "group",
  initialize: function(options){
    this.accounts = options.accounts;
    this.newTitle = "All Accounts"
    this.listenTo(this.accounts, "sync", this.render);
    this.listenTo(this.collection, "sync add", this.render);
  },
  render: function(newTitle){
    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);
    this.addTransactions();

    $(".top-title").html(this.newTitle)
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
    $(".modal-window-transaction").removeClass("display-none");
    var transaction = new SixthCents.Models.Transaction();
    var formView = new SixthCents.Views.TransactionFormView({ model: transaction, collection: this.collection, accounts: this.accounts, id: "" })

    this.addSubview(".modal-window-transaction", formView);
  },
  filter: function(event){
    event.preventDefault();
    var that = this;
    this.newTitle = "All Accounts";



    if(that.collection.length > 0){
      if($(event.currentTarget).data("value") === "cash-credit"){
        this.newTitle = "Cash & Credit";
        that.collection = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Checking" || transaction._accountType.account_type === "Credit Card"
        })
        that.render();
        that.collection = new SixthCents.Collections.Transactions();
        that.collection.fetch();
        return
      } else if($(event.currentTarget).data("value") === "investment"){
        that.newTitle = "Investment";
        that.collection = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Savings" || transaction._accountType.account_type === "Investment"
        })
        that.render();
        that.collection = new SixthCents.Collections.Transactions();
        that.collection.fetch();
        return
      } else if($(event.currentTarget).data("value") === "loan"){
        that.newTitle = "Loan";
        that.collection = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Loan"
        })
        that.render();
        that.collection = new SixthCents.Collections.Transactions();
        that.collection.fetch();
        return
      }
    }

  },

  refresh: function(){
    this.newTitle = "All Accounts";
    this.collection = new SixthCents.Collections.Transactions();
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetch();
  }

})
