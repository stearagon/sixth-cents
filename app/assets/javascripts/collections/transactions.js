SixthCents.Collections.Transactions = Backbone.Collection.extend({
  url: "/api/transactions",
  model: SixthCents.Models.Transaction,
  comparator: function(transaction){
    return -Date.parse(transaction.get("transaction_date"))
  },

  sum: function(){
    var sum = 0;
    this.each(function(transaction){
      sum += parseInt(transaction.get("amount"));
    })
    return sum;
  },
  parse: function(response){

    if (response.account) {
      this._accountType = response.account;
      delete response.account;
    }
    return response;
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

  transactions_time: function(startDate, endDate, category){
    var income = 0;
    var spend = 0;

    var date1 = Date.parse(startDate)
    var date2 = Date.parse(endDate)

    this.each( function(transaction){

      var tdate = Date.parse(transaction.get("transaction_date"))
      if(tdate >= date1 && tdate < date2){

        if (transaction.get("category") === "Income") {
          income += parseInt(transaction.get("amount"));
        } else if (transaction.get("category") !== "Repay Debt" && transaction._accountType.account_type !== "Loan" &&
           transaction._accountType.account_type !== "Investment"){
          spend += parseInt(transaction.get("amount"));
        };
      }
    })


    return { income: income, spend: spend }
  },

  transactions_time_debt: function(){
    var data = []
    var currDate = new Date()
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth()-5, currDate.getDate())
    for(var i = 1; i < 7; i++) {
      var y = currDate.getFullYear(), m = (currDate.getMonth())
      var lastDay = new Date(y, m + 1, 0)
      var debtTotal = 0;
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      var date1 = Date.parse(lastDay)

      if (this.length > 0) {
        this.each(function(transaction){
          var tdate = Date.parse(transaction.get("transaction_date"))
            if(tdate < date1 && (transaction._accountType.account_type === "Loan" || transaction._accountType.account_type === "Credit Card" )){
              debtTotal += parseInt(transaction.get("amount"));

          }
        })
      }

      data.push([months[currDate.getMonth()], debtTotal])
      currDate.setMonth(currDate.getMonth() + 1)
      }
  return data
}

})
SixthCents.Collections.transactions = new SixthCents.Collections.Transactions()
