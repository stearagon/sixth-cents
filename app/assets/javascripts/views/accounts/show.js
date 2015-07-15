SixthCents.Views.AccountShow = Backbone.CompositeView.extend({
  template: JST["accounts/show"],
  render: function(){
    var content = this.template({ model: this.model })

    this.$el.html(content);

    return this;
  }
})
