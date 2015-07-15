SixthCents.Views.AccountShow = Backbone.CompositeView.extend({
  template: JST["accounts/show"],
  events: {
    "click .add-trans" : "addTransaction"
  },
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },
  render: function(){

    var content = this.template({ model: this.model })

    this.$el.html(content);

    return this;
  },

  addTransaction: function(){
    debugger
    var transaction = new SixthCents.Models.Transaction();
    var formView = new SixthCents.Views.TransactionFormView({ model: transaction })

    this.addSubview(".modal-window", formView);
  }
})
