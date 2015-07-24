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
  },

  lastSixMonths: function(){
    var $netIncomeEl = "";
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currDate = new Date();
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate());
    var that = this;
    for (var i = 0; i < 6; i++){
      var y = currDate.getFullYear(), m = currDate.getMonth() - i;

      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 1);
      var incomeAndSpend = { income: 0, spend: 0 };

      if (this.length > 0) {
        var acctIncomeAndSpend;
        this.each( function(account){
          acctIncomeAndSpend = account.transactions_time(firstDay, lastDay);
        })
        incomeAndSpend.income += acctIncomeAndSpend.income;
        incomeAndSpend.spend += acctIncomeAndSpend.spend;
      }

      var month = months[currDate.getMonth() - i];
      var income = incomeAndSpend.income;
      var spend = incomeAndSpend.spend;

      $netIncomeEl += "<br><h3>" + month + " Net Income</h3> Income: " + income + "<br>Spend:" + spend + "<br>"
    }

    return $netIncomeEl;
  }
})
SixthCents.Collections.accounts = new SixthCents.Collections.Accounts()
