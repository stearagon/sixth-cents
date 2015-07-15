SixthCents.Collections.Institutions = Backbone.Collection.extend({
  url: "/api/institutions",
  model: SixthCents.Models.Institution,

  getOrFetch: function(id){
    var inst = this.get(id);
    var that = this;
    if (inst) {
      inst.fetch();
    } else {
      inst = new SixthCents.Models.Institution({ id: id });
      inst.fetch({ success: function(){
        that.add(inst, {merge: true})
        }
      })
    }

    return inst
  }
  //
  // parse: function(response){
  //   
  //   if (response){
  //     response.forEach(function(account){
  //       
  //       if (account.institution) {
  //         account.institution().set(account.institution, { merge: true })
  //         delete account.institution
  //       }
  //     })
  //   }
  //     return response
  // }
})
