SixthCents.Views.TransactionsIndex = Backbone.CompositeView.extend({
  template: JST["transactions/index"],
  events: {
    "click .add-trans" : "createTransaction",
    "click .filter" : "filter",
    "click .sidebar-account-title" : "refresh",
    "dblclick .transactions-list-item" : "edit"
  },
  className: "group",
  initialize: function(options){
    this.accounts = options.accounts;
    this.newTitle = "All Accounts"
    this.listenTo(this.accounts, "sync change", this.render);
    this.listenTo(this.collection, "add change", this.render);
  },
  render: function(newTitle){

    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);
    this.addTransactions();

    $(".top-title").html(this.newTitle)
    return this;
  },

  addTransaction: function(transaction){
    var color = transaction.collection.indexOf(transaction) % 2 === 0 ? "gray-back" : "white-back";
    var transactionItem = new SixthCents.Views.TransactionItem({ model: transaction, color: color });
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
    var collectionFilter;

    this.newTitle = "All Accounts";

    // if(that.collection.length > 0){
      if($(event.currentTarget).data("value") === "cash-credit"){

        that.newTitle = "Cash & Credit";
        collectionFilter = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Checking" || transaction._accountType.account_type === "Credit Card"
        })

      } else if($(event.currentTarget).data("value") === "investment"){
        that.newTitle = "Investment";
        collectionFilter = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Savings" || transaction._accountType.account_type === "Investment"
        })

      } else if($(event.currentTarget).data("value") === "loan"){
        that.newTitle = "Loan";

        collectionFilter = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Loan"
        })
      }
    // }

    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);

    collectionFilter.forEach(this.addTransaction.bind(this))

    $(".top-title").html(that.newTitle)
    // that.collection.fetch();
  },

  refresh: function(){
    this.newTitle = "All Accounts";
    this.collection = new SixthCents.Collections.Transactions();
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetch();
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
