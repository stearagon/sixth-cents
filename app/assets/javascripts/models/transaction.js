SixthCents.Models.Transaction = Backbone.Model.extend({
  urlRoot: "/api/transactions",
  parse: function(response){
    if (response.account) {
      this._accountType = response.account;
      delete response.account;
    }
    return response;
  }
});
