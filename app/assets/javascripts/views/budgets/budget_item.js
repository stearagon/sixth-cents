SixthCents.Views.BudgetItem = Backbone.CompositeView.extend({
  template: JST["budgets/budget_item"],
  tagName: "tr",
  render: function(){
    var content = this.template({ budget: this.model })

    this.$el.html(content);

    return this;
  }
})
