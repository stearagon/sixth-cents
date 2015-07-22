SixthCents.Views.Splash = Backbone.CompositeView.extend({
  template: JST["shared/splash"],
  tagName: "div",
  className: "splash-img",
  render: function(){
    var content = this.template({ source: "https://dl.dropboxusercontent.com/u/22258339/finances.jpg" })

    this.$el.html(content)

    return this;
  }

})
