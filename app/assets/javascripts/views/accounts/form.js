SixthCents.Views.FormView = Backbone.CompositeView.extend({
  template: JST["accounts/form"],
  tagName: "form",
  events: {
    "click button" : "submit"
  },

  typesOfAccounts: [

  ],

  render: function(){
    var content = this.template({ account: this.model });

    this.$el.html(content);

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;

    that.model.set(attrs);
    that.model.save({}, {
      success: function(){
        that.collection.add(that.model, { merge: true, parse: true });
        Backbone.history.navigate("", { trigger: true })
      },
      error: function(){
        //show error on new form
      }
    })
  }
})
