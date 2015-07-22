SixthCents.Models.BudgetInstruction = Backbone.Model.extend({
  urlRoot: "/api/budget_instructions",
  budgetHyphen: function(){
    return this.get("category").split("&").join("-").split(" ").join("-")
  }
});
