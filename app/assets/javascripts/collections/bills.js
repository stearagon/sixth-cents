SixthCents.Collections.Bills = Backbone.Collection.extend({
  url: "/api/bills",
  model: SixthCents.Models.Bill,
  comparator: function(bill){
    return bill.get("bill_date")
  },
  getOrFetch: function(id){
    var bill = this.get(id);
    var that = this;
    if (bill) {
      bill.fetch();
    } else {
      bill = new that.model({ id: id });
      bill.fetch({ success: function(){
        that.add(bill, {merge: true})
        }
      })
    }

    return bill;
  },
  billsTime: function(){
    var newCollection = [];
    var currDate = new Date();
    var currDate = new Date( currDate.getYear() + 1900, currDate.getMonth(), currDate.getDate())
     var y = currDate.getFullYear(), m = (currDate.getMonth()), d = (currDate.getDate());
     var firstDay = new Date(y, m, d)
     var lastDay = new Date(y, m, d + 27)

      var date1 = Date.parse(firstDay)
      var date2 = Date.parse(lastDay)

      this.each( function(bill){
      var tdate = Date.parse(bill.get("bill_date"))
      if(tdate >= date1 && tdate < date2){
        newCollection.push(bill)
      }
    })

    return newCollection;
  }
})
SixthCents.Collections.bills = new SixthCents.Collections.Bills()
