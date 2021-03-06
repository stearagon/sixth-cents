SixthCents.Views.BillFormView = Backbone.CompositeView.extend({
  template: JST["bills/form"],
  tagName: "form",
  className: "add-bill-form",
  events: {
    "click .submit-bill" : "create",
    "click .cancel-form" : "cancel"
  },
  initialize: function(options){
    this.accounts = options.accounts;
  },
  render: function(){

    var content = this.template({ bill: this.model, bills: this.collection, accounts: this.accounts });

    this.$el.html(content);

    return this;
  },
  create: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;
    attrs.bill_date = new Date(Date.parse(attrs.bill_date) + 86400000)

    this.model.set(attrs);

    

    this.model.save({}, { success: function() {
      that.collection.add(that.model)
      Backbone.history.navigate("#", { trigger: true })
      that.remove();
      $(".modal-window").addClass("display-none");
      $("body").css({ overflow: "scroll"});
      $(".modal-window").removeClass("add-bill");
    }})
  },
  cancel: function(event){
    event.preventDefault();
    $("body").css({ overflow: "scroll"});
    $(".modal-window").addClass("display-none");
    $(".modal-window").removeClass("add-bill");
    this.remove();
  }
})
