SixthCents.Views.TransactionFormView = Backbone.CompositeView.extend({
  template: JST["transactions/form"],
  tagName: "form",
  events: {
    "click .create-transaction" : "submit",
    "click .cancel-form" : "cancel"
  },
  categoryNames: [
    "Uncategorized",
    "Auto Transport",
    "Bills & Utilities",
    "Business Servies",
    "Education",
    "Entertainment",
    "Fees & Charges",
    "Financial",
    "Food & Drinking",
    "Gift & Donations",
    "Health & Fitness",
    "Home",
    "Income",
    "Investments",
    "Kids",
    "Misc Expenses",
    "Personal Care",
    "Pets",
    "Repay Debt",
    "Shopping",
    "Taxes",
    "Transfer",
    "Travel",
    "Hide from Budgets & Trends"
  ],
  initialize: function(options){
    this.accounts = options.accounts;
    this.account_id = options.id;
  },
  render: function(){
    var categoryNum;
    var that = this;
    this.categoryNames.forEach( function(category){
      if (category === that.model.get("category")){
        categoryNum = that.categoryNames.indexOf(category)
      }
    })



    var content = this.template({ model: this.model, categories: this.categoryNames, accounts: this.accounts, id: this.account_id, catNum: categoryNum });

    this.$el.html(content);
    this.$el.addClass("transaction-form")

    return this;
  },
  submit: function(event){

    event.preventDefault();
    var attrs = this.$el.serializeJSON();

    attrs.amount = parseInt(attrs.amount) * parseInt(attrs.type_trans)
    delete attrs.type_trans

    this.model.set(attrs);
    this.model.save({}, { success: function() {
        this.collection.add(this.model, { merge: true, parse: true });
        this.collection.sort();
        if (this.account_id === ""){Backbone.history.navigate("#accounts", { trigger: true })
      } else {Backbone.history.navigate("#accounts/" + this.account_id, { trigger: true })}
        this.remove();
        $("body").css({ overflow: "scroll"});
        $(".modal-window-transaction").addClass("display-none");
      }.bind(this),
      error: function(){
      }
    })
  },
  cancel: function(){
    event.preventDefault();
    this.remove();
    $("body").css({ overflow: "scroll"});
    $(".modal-window-transaction").addClass("display-none");
  }
})
