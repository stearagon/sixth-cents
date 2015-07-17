SixthCents.Collections.Budgets = Backbone.Collection.extend({
  url: "/api/budgets",
  model: SixthCents.Models.Budget,

  getOrFetch: function(id){
    var budget = this.get(id);
    var that = this;
    if (budget) {
      budget.fetch();
    } else {
      budget = new that.model({ id: id });
      budget.fetch({ success: function(){
        that.add(budget, {merge: true})
        }
      })
    }

    return budget;
  }
})
SixthCents.Collections.budgets = new SixthCents.Collections.Budgets()
