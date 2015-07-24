SixthCents.Collections.BudgetInstructions = Backbone.Collection.extend({
  url: "/api/budget_instructions",
  model: SixthCents.Models.BudgetInstruction,
  comparator: function(budgetInstruction){
    return budgetInstruction.get("category")
  },
  getOrFetch: function(id){
    var budgetInstruction = this.get(id);
    var that = this;
    if (budgetInstruction) {
      budgetInstruction.fetch();
    } else {
      budgetInstruction = new that.model({ id: id });
      budgetInstruction.fetch({ success: function(){
        that.add(budgetInstruction, {merge: true})
        }
      })
    }

    return budgetInstruction;
  }
})
SixthCents.Collections.budgetInstructions = new SixthCents.Collections.BudgetInstructions()
