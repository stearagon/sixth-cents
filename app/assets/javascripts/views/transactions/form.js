SixthCents.Views.TransactionFormView = Backbone.CompositeView.extend({
  template: JST["transactions/form"],
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
  tagName: "form",
  render: function(){
    var content = this.template({ model: this.model, categories: this.categoryNames, accounts: this.accounts, id: this.account_id });

    this.$el.html(content);

    return this;
  },
  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();

    attrs.amount = parseInt(attrs.amount) * parseInt(attrs.type_trans)
    delete attrs.type_trans

    this.model.set(attrs);
    this.model.save({}, { success: function() {
        this.collection.add(this.model, { merge: true });
        this.collection.sort();
        Backbone.history.navigate("/accounts/" + this.account_id, { trigger: true })
        this.remove();
      }.bind(this),
      error: function(){
      }
    })
  },
  cancel: function(){
    event.preventDefault();
    this.remove();
  }
})
