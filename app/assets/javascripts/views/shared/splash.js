SixthCents.Views.Splash = Backbone.CompositeView.extend({
  template: JST["shared/splash"],
  tagName: "div",
  className: "splash-img",
  render: function(){
    var content = this.template({ source: "images/finances.jpg" })

    this.$el.html(content)

    return this;
  }

})
