SixthCents.Views.FormView = Backbone.CompositeView.extend({
  template: JST["accounts/form"],
  tagName: "form",
  events: {
    "click button" : "submit"
  },
  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({ account: this.model });

    this.$el.html(content);

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this.collection

    this.model.set(attrs);
    this.model.save({}, {
      success: function(){
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true })
      }
    })
  }
})
