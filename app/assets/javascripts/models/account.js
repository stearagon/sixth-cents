SixthCents.Models.Account = Backbone.Model.extend({
  urlRoot: "/api/accounts",

  institution: function(){
    if (!this._institution) {
      this._institution = new SixthCents.Models.Institution();
    }
    return this._institution;
  },

  parse: function(response){
    
    if (response.institution) {
      this.institution().set(response.institution, { merge: true })
      delete response.institution;
    }
    return response;
  }
});
