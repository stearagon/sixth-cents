SixthCents.Views.BudgetFormView = Backbone.CompositeView.extend({
  template: JST["budgets/form"],
  events: {
    "click .create-budget" : "submit",
    "click .cancel-form" : "cancel"
  },
  categoryNames: [
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
  tagName: "form",
  render: function(){
    var content = this.template({ model: this.model, categories: this.categoryNames });

    this.$el.html(content);

    return this;
  },
  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();

    this.model.set(attrs);
    this.model.save({}, { success: function() {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("/budgets/", { trigger: true })
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
