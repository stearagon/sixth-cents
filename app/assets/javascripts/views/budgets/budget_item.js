SixthCents.Views.BudgetItem = Backbone.CompositeView.extend({
  template: JST["budgets/budget_item"],
  initialize: function(options){
    this.total = options.total;
  },
  tagName: "div",
  className: "budget-container-box group",
  render: function(){
    var colors;
    if (this.model.get("category") === "Income"){
      colors = ["green", "yellow", "red"]
    } else {
      colors = ["red", "yellow", "green"]
    }
    var budgetClass = this.model.budgetHyphen()
    var content = this.template({ budget: this.model, total: this.total, budgetClass: budgetClass, colors: colors })

    this.$el.html(content);

    return this;
  }
})
