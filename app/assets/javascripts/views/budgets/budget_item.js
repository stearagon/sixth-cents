SixthCents.Views.BudgetItem = Backbone.CompositeView.extend({
  template: JST["budgets/budget_item"],
  initialize: function(options){
    this.total = options.total;
  },
  tagName: "div",
  className: "group",
  render: function(){
    
    var budgetClass = this.model.budgetHyphen()
    var content = this.template({ budget: this.model, total: this.total, budgetClass: budgetClass })

    this.$el.html(content);

    return this;
  }
})
