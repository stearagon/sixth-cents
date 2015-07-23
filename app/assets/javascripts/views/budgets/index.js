SixthCents.Views.BudgetsIndex = Backbone.CompositeView.extend({
  template: JST["budgets/index"],
  events: {
    "click .add-budget" : "createBudget"
  },
  className: "budget-index group",
  initialize: function(options){
    this.budgetInstructions = options.budgetInstructions;
    this.transactions = options.transactions;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.transactions, "sync", this.render);
    this.listenTo(this.budgetInstructions, "sync", this.render);
  },
  render: function(){
    var content = this.template({ budgets: this.collection, spend: this.spend, income: this.income, budgetSpend: this.budgetSpend, budgetIncome: this.budgetIncome })
    this.$el.html(content);
    this.addBudgets();
    return this;
  },

  createBudget: function(){

    $("body").css({ overflow: "hidden"});
    $(".modal-window-budgets").removeClass("display-none");
    var budget = new SixthCents.Models.BudgetInstruction();
    var formView = new SixthCents.Views.BudgetFormView({ model: budget,
      collection: this.collection, budgetInstructions: this.budgetInstructions})

    this.addSubview(".modal-window-budgets", formView);
  },

  addBudget: function(budget){
    var currDate = new Date()
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate())
    var y = currDate.getFullYear(), m = (currDate.getMonth())
    var firstDay = new Date(y, m, 0)
    var lastDay = new Date(y, m + 1, 0)
    var incomeAndSpend = { income: 0, spend: 0 }

    var date1 = Date.parse(firstDay)
    var date2 = Date.parse(lastDay)

    var spendTotal = 0;

    this.transactions.each(function(transaction){
      var tdate = Date.parse(transaction.get("transaction_date"))
      if(tdate >= date1 && tdate < date2){
        if(transaction.get("category") === budget.get("category")){
          spendTotal += parseInt(transaction.get("amount"))
        }
      }
    })

    spendTotal = parseInt(spendTotal) * -1;

    // var spending = this.transactions.where({category: budget.get("category")});
    // if (spending.length > 0){
    //
    //   spending.forEach(function(transaction){
    //     spendTotal += -parseInt(transaction.get("amount"))
    //   })
    // }

    var budgetItem = new SixthCents.Views.BudgetItem({ model: budget, total: spendTotal });
    this.addSubview(".spends-main", budgetItem);
  },

  addIncome: function(budget){
    var currDate = new Date()
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate())
    var y = currDate.getFullYear(), m = (currDate.getMonth())
    var firstDay = new Date(y, m, 0)
    var lastDay = new Date(y, m + 1, 0)
    var incomeAndSpend = { income: 0, spend: 0 }

    var date1 = Date.parse(firstDay)
    var date2 = Date.parse(lastDay)

    spendTotal = 0;

    this.transactions.each(function(transaction){
      var tdate = Date.parse(transaction.get("transaction_date"))
      if(tdate >= date1 && tdate < date2){
        if(transaction.get("category") === budget.get("category")){
          spendTotal += parseInt(transaction.get("amount"))
        }
      }
    })

    this.budgetIncome += parseInt(budget.escape("amount"))


    // var spending = this.transactions.transactions_time.where({category: "Income"});
    // if (spending.length > 0){
    //   spending.forEach(function(transaction){
    //     spendTotal += parseInt(transaction.get("amount"))
    //   })
    // }

    var budgetItem = new SixthCents.Views.BudgetItem({ model: budget, total: spendTotal });
    this.addSubview(".income-main", budgetItem);
  },

  addBudgets: function(){
    var currDate = new Date()
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate())
    var y = currDate.getFullYear(), m = (currDate.getMonth())
    var firstDay = new Date(y, m, 0)
    var lastDay = new Date(y, m + 1, 0)
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
