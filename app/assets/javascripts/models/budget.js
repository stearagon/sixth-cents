SixthCents.Models.Budget = Backbone.Model.extend({
  urlRoot: "/api/budgets",
  budgetHyphen: function(){
    return this.get("category").split(" ").join("-")
  }
});
