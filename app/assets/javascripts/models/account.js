SixthCents.Models.Account = Backbone.Model.extend({
  urlRoot: "/api/accounts",

  institution: function(){
    if (!this._institution) {
      this._institution = new SixthCents.Models.Institution();
    }
    return this._institution;
  },

  institutionHyphen: function(){
    return this.institution().get("name").split(" ").join("-")
  },

  transactions: function(){
    if (!this._transactions) {
      this._transactions = new SixthCents.Collections.Transactions();
    }
    return this._transactions;
  },

  transactions_time: function(startDate, endDate){
    var income = 0;
    var spend = 0;

    var date1 = Date.parse(startDate)
    var date2 = Date.parse(endDate)

    this.transactions().each( function(transaction){

      var tdate = Date.parse(transaction.get("transaction_date"))
      if(tdate >= date1 && tdate <= date2){

        if (transaction.get("amount") >= 0 && transaction.get("category") !== "Repay Debt") {
          income += parseInt(transaction.get("amount"));
        } else if (transaction.get("amount") <= 0 && transaction.get("category") !== "Repay Debt") {
          spend += parseInt(transaction.get("amount"));
        };
      }
    })

    return { income: income, spend: spend }
  },

  type: function(){
    var acctType = this.get("account_type");

    switch(acctType) {
      case "Checking":
        this._type = "cash";
        break;
      case "Credit Card":
        this._type = "credit";
        break;
      case "Loan":
        this._type = "loan";
        break;
      case "Savings":
        this._type = "investment";
        break;
      case "Investment":
        this._type = "investment";
        break;
      default: //this takes in all other assets
      this._type = "property";
      break;
    }
    return this._type;
  },

  parse: function(response){
    if (response.institution) {
      this.institution().set(response.institution, { merge: true })
      delete response.institution;
    }

    if (response.transactions && response.transactions.length !== 0) {
      this.transactions().set(response.transactions, { merge: true })
      delete response.transaction;
    }

    if (response.amount) {
      this.amount = response.amount
      delete response.amount;
    }

    return response;
  },
  toJSON: function(){
    return {account: _.clone(this.attributes)};
  }
});
