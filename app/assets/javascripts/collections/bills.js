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
  }
})
SixthCents.Collections.bills = new SixthCents.Collections.Bills()
