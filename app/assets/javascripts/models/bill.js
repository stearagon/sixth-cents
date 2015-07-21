SixthCents.Models.Bill = Backbone.Model.extend({
  urlRoot: "/api/bills",
  dateFormat: function(){
    var date = new Date(this.get("bill_date"));

    return (parseInt(date.getMonth()) + 1)  + "/" + date.getDate() + "/" + (parseInt(date.getYear()) + 1900);
  }
});
