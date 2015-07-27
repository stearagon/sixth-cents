SixthCents.Views.TransactionsIndex = Backbone.CompositeView.extend({
  template: JST["transactions/index"],
  events: {
    "click .add-trans" : "createTransaction",
    "click .filter" : "filter",
    "click .sidebar-account-title" : "refresh",
    "click .transactions-list-item" : "edit"
  },
  className: "group",
  initialize: function(options){
    // this.transactions = options.transactions;
    this.accounts = options.accounts;
    this.id = options.id;
    this.listenTo(this.accounts, "add", this.render);
    // this.listenTo(this.transactions, "add change", this.render);
    // this.listenTo(this.accounts, "sync", this.render);
    // this.listenTo(this.transactions, "sync add", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function(accountsTitle){

    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);
    this.addTransactions();

    $(".top-title").html(this.accountsTitle);
    $(".bottom-account-title").html(this.accountsSubTitle);
    return this;
  },

  addTransaction: function(transaction){

    var color = transaction.collection.indexOf(transaction) % 2 === 0 ? "gray-back" : "white-back";
    var transactionItem = new SixthCents.Views.TransactionItem({ model: transaction, color: color });

    this.addSubview(".transactions-list", transactionItem);
  },

  addTransactions: function(){

    if (isNaN(this.id)){
      this.accountsTitle = "All Accounts"
      this.accountsSubTitle = "You have " + this.accounts.length + " account(s)"
      this.collection.each(this.addTransaction.bind(this))
    } else {
      var account = this.accounts.getOrFetch(this.id)
      this.accountsTitle = account.institution().escape("name")
      this.accountsSubTitle = account.escape("account_type") + "(" + account.escape("identifier") + ")"
      this.collection.where({ account_id: this.id }).forEach(this.addTransaction.bind(this))
    }
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

    this.accountsTitle = "All Accounts";

    // if(that.collection.length > 0){
      if($(event.currentTarget).data("value") === "cash-credit"){

        that.accountsTitle = "Cash & Credit";
        collectionFilter = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Checking" || transaction._accountType.account_type === "Credit Card"
        })

      } else if($(event.currentTarget).data("value") === "investment"){
        that.accountsTitle = "Investment";
        collectionFilter = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Savings" || transaction._accountType.account_type === "Investment"
        })

      } else if($(event.currentTarget).data("value") === "loan"){
        that.accountsTitle = "Loan";

        collectionFilter = _.filter(that.collection.models, function(transaction){
          return transaction._accountType.account_type === "Loan"
        })
      }
    // }

    var content = this.template({ model: this.model, accounts: this.accounts })
    this.$el.html(content);

    collectionFilter.forEach(this.addTransaction.bind(this))

    $(".top-title").html(that.accountsTitle)
    // that.collection.fetch();
  },

  refresh: function(){
    this.accountsTitle = "All Accounts";
    this.collection = new SixthCents.Collections.Transactions();
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetch();
  },

  edit: function(event){
    $("body").css({ overflow: "hidden"});
    $(".modal-window-transaction").removeClass("display-none");
    var id = $(event.currentTarget).data("id")
    var transaction = this.collection.getOrFetch(id);
    var formView = new SixthCents.Views.TransactionFormView({ model: transaction, collection: this.collection, accounts: this.accounts, id: "" })

    this.addSubview(".modal-window-transaction", formView);
  }

})
