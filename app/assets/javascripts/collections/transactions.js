SixthCents.Collections.Transactions = Backbone.Collection.extend({
  url: "/api/transactions",
  model: SixthCents.Models.Transaction,
  comparator: function(transaction){
    return transaction.get("transaction_date")
  },
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
  },

  transactions_time: function(startDate, endDate){
    var income = 0;
    var spend = 0;

    var date1 = Date.parse(startDate)
    var date2 = Date.parse(endDate)

    this.each( function(transaction){

      var tdate = Date.parse(transaction.get("transaction_date"))
      if(tdate >= date1 && tdate < date2){

        if (transaction.get("category") === "Income") {
          income += parseInt(transaction.get("amount"));
        } else if (transaction.get("category") !== "Repay Debt"){
          
          spend += parseInt(transaction.get("amount"));
        };
      }
    })
    

    return { income: income, spend: spend }
  }
})
SixthCents.Collections.transactions = new SixthCents.Collections.Transactions()
