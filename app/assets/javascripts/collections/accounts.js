SixthCents.Collections.Accounts = Backbone.Collection.extend({
  url: "/api/accounts",
  model: SixthCents.Models.Account,
  comparator: function(account){
    return account.institution().get("name")
  },

  cash: function(){
    this._cash = 0;

    this.forEach( function(account){
      if (account.type() === "cash"){
        if (account.amount){
          this._cash += parseInt(account.amount);
        }
      }
    }.bind(this))
    return this._cash
  },

  credit: function(){
    this._credit = 0;

    this.forEach( function(account){
      if (account.type() === "credit"){
        if (account.amount){
          this._credit += parseInt(account.amount);
        }
      }
    }.bind(this))
    return this._credit
  },

  loans: function(){
    this._loans = 0;

    this.forEach( function(account){
      if (account.type() === "loan"){
        if (account.amount){
          this._loans += parseInt(account.amount);
        }
      }
    }.bind(this))
    return this._loans
  },

  investments: function(){
    this._investments = 0;

    this.forEach( function(account){
      if (account.type() === "investment"){
        if (account.amount){
          this._investments += parseInt(account.amount);
        }
      }
    }.bind(this))
    return this._investments
  },

  property: function(){
    this._property = 0;

    this.forEach( function(account){
      if (account.type() === "property"){
        if (account.amount){
          this._property += parseInt(account.amount);
        }
      }
    }.bind(this))
    return this._property
  },

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
SixthCents.Collections.accounts = new SixthCents.Collections.Accounts()
