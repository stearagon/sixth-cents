SixthCents.Views.BudgetsIndex = Backbone.CompositeView.extend({
  template: JST["budgets/index"],
  events: {
    "click .add-budget" : "createBudget"
  },
  initialize: function(options){
    this.listenTo(this.collection, "add sync", this.render);
  },
  render: function(){
    var content = this.template({ budgets: this.collection })
    this.$el.html(content);
    this.addBudgets();
    return this;
  },

  createBudget: function(){
    var budget = new SixthCents.Models.Budget();
    var formView = new SixthCents.Views.BudgetFormView({ model: budget, collection: this.collection })

    this.addSubview(".modal-window", formView);
  },

  addBudget: function(budget){
    
    var budgetItem = new SixthCents.Views.BudgetItem({ model: budget });
    this.addSubview(".budgets-list", budgetItem);
  },

  addBudgets: function(){
      this.collection.forEach(this.addBudget.bind(this))
  }

})
