SixthCents.Views.AccountsIndex = Backbone.CompositeView.extend({
  template: JST["accounts/index"],
  initialize: function(){
    this.listenTo(this.collection, "sync add remove change", this.render);
  },

  render: function(){
    var content = this.template({ accounts: this.collection });

    this.$el.html(content);

    return this;
  }
})
