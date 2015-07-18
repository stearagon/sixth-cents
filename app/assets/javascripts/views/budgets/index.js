SixthCents.Views.BudgetsIndex = Backbone.CompositeView.extend({
  template: JST["budgets/index"],
  events: {
    "click .add-budget" : "createBudget"
  },
  initialize: function(options){
    this.budgetInstructions = options.budgetInstructions;
    this.transactions = options.transactions;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.budgetInstructions, "sync", this.render);
  },
  render: function(){
    var content = this.template({ budgets: this.collection, spend: this.spend, income: this.income, budgetSpend: this.budgetSpend, budgetIncome: this.budgetIncome })
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
    this.budgetIncome += parseInt(budget.escape("amount"))
    var budgetItem = new SixthCents.Views.BudgetItem({ model: budget });
    this.addSubview(".income-list", budgetItem);
  },

  addBudgets: function(){
    var currDate = new Date()
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate())
    var y = currDate.getFullYear(), m = (currDate.getMonth())
    var firstDay = new Date(y, m, 1)
    var lastDay = new Date(y, m + 1, 1)
    var incomeAndSpend = { income: 0, spend: 0 }


    if (this.transactions.length > 0) {
      incomeAndSpend = this.transactions.transactions_time(firstDay, lastDay)
    }
    this.income = incomeAndSpend.income;
    this.spend = -incomeAndSpend.spend;

    var that = this;
    this.budgetSpend = 0;
    this.budgetIncome = 0
      this.budgetInstructions.where({ category: "Income" }).forEach(this.addIncome.bind(this))


      if(this.budgetInstructions.length > 0){
        this.budgetInstructions.forEach(function(budget){
          if (budget.escape("category") !== "Income"){
            that.addBudget(budget);
            that.budgetSpend += parseInt(budget.escape("amount"));
          }
        })
      }

  }

})
