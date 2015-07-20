SixthCents.Views.BudgetItem = Backbone.CompositeView.extend({
  template: JST["budgets/budget_item"],
  initialize: function(options){
    this.total = options.total;
  },
  tagName: "tr",
  render: function(){
    var content = this.template({ budget: this.model, total: this.total })

    this.$el.html(content);

    return this;
  }
})
