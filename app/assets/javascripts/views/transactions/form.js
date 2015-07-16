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
    "Shopping",
    "Taxes",
    "Transfer",
    "Travel",
    "Hide from Budgets & Trends"
  ],
  initialize: function(options){
    this.account = options.account;
  },
  tagName: "form",
  render: function(){
    var content = this.template({ model: this.model, categories: this.categoryNames });

    this.$el.html(content);

    return this;
  },
  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    attrs["account_id"] = this.account.get("id");

    this.model.set(attrs);
    this.model.save({}, { success: function() {

        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("/accounts/" + this.account.get("id"), { trigger: true })
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
