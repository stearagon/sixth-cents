SixthCents.Views.AccountsIndex = Backbone.CompositeView.extend({
  template: JST["accounts/new"],
  tagName: "form",
  events: {
    "click button" : "submit"
  },

  render: function(){
    var content = this.template({ account: this.model });

    this.$el.html(content);

    return this;
  },

  submit: function(event){

  }
})
