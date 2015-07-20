SixthCents.Models.Bill = Backbone.Model.extend({
  urlRoot: "/api/bills",
  dateFormat: function(){
    var date = new Date(this.get("bill_date"));


    return date.getMonth() + "/" + date.getDate() + "/" + (parseInt(date.getYear()) + 1900);
  }
});
