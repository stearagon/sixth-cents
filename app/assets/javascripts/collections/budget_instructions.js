SixthCents.Collections.BudgetInstructions = Backbone.Collection.extend({
  url: "/api/budget_instructions",
  model: SixthCents.Models.BudgetInstruction,
  initialize: function(){
    this.page = 1;
    this.fetchOver = false;
  },
  fetch: function(){
    if (this.fetchOver) { return };

    var that = this;

    Backbone.Collection.prototype.fetch.call(that, {
      remove: false,
      data: { page: that.page },
      success: function (collection, response, options){
        if (response.length === 0) { that.fecthOver = true }
        that.page++;
      }
    })
  },
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
