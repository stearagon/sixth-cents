SixthCents.Views.BudgetsIndex = Backbone.CompositeView.extend({
  template: JST["budgets/index"],
  events: {
    "click .add-budget" : "createBudget"
  },
  initialize: function(options){
    this.budgetInstructions = options.budgetInstructions;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.budgetInstructions, "sync", this.render);
  },
  render: function(){

    var content = this.template({ budgets: this.collection, spend: this.spend, income: this.income })
    this.$el.html(content);
    this.addBudgets();
    return this;
  },

  createBudget: function(){
    var budget = new SixthCents.Models.BudgetInstruction();
    var formView = new SixthCents.Views.BudgetFormView({ model: budget,
      collection: this.collection, budgetInstructions: this.budgetInstructions})

    this.addSubview(".modal-window", formView);
  },

  addBudget: function(budget){

    var budgetItem = new SixthCents.Views.BudgetItem({ model: budget });
    this.addSubview(".spends-list", budgetItem);
  },

  addIncome: function(budget){
    this.income += parseInt(budget.escape("amount"))
    var budgetItem = new SixthCents.Views.BudgetItem({ model: budget });
    this.addSubview(".income-list", budgetItem);
  },

  addBudgets: function(){
    var that = this;
    this.spend = 0;
    this.income = 0
      this.budgetInstructions.where({ category: "Income" }).forEach(this.addIncome.bind(this))


      if(this.budgetInstructions.length > 0){
        this.budgetInstructions.forEach(function(budget){
          if (budget.category !== "Income"){
            that.addBudget(budget);
            that.spend += parseInt(budget.escape("amount"));
          }
        })
      }
  }

})
