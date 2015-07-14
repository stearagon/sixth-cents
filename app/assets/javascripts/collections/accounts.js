SixthCents.Collections.Accounts = Backbone.Collection.extend({
  url: "/api/accounts",
  model: SixthCents.Models.Account,

  getOrFetch: function(id){
    var account = this.get(id);
    var that = this;
    if (account) {
      account.fetch();
    } else {
      account = new that.model({ id: id });
      account.fetch({ success: function(){
        that.add(account, {merge: true})
        }
      })
    }

    return account
  }
})
