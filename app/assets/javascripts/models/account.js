SixthCents.Models.Account = Backbone.Model.extend({
  urlRoot: "/api/accounts",

  institution: function(){
    if (!this._institution) {
      this._institution = new SixthCents.Models.Institution();
    }
    return this._institution;
  },

  transactions: function(){
    if (!this._transactions) {
      this._transactions = new SixthCents.Collections.Transactions();
    }
    return this._transactions;
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
  }
});
