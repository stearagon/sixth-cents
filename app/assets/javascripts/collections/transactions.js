SixthCents.Collections.Transactions = Backbone.Collection.extend({
  url: "/api/transactions",
  model: SixthCents.Models.Transaction,

  getOrFetch: function(id){
    var transaction = this.get(id);
    var that = this;
    if (transaction) {
      transaction.fetch();
    } else {
      transaction = new that.model({ id: id });
      transaction.fetch({ success: function(){
        that.add(transaction, {merge: true})
        }
      })
    }

    return transaction;
  }
})
SixthCents.Collections.transactions = new SixthCents.Collections.Transactions()
