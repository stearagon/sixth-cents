SixthCents.Views.FormView = Backbone.CompositeView.extend({
  template: JST["accounts/form"],
  tagName: "form",
  events: {
    "click button" : "submit"
  },

  typesOfAccounts: [

  ],

  initialize: function(options){
    this.listenTo(this.model, "sync add", this.render)
    this.listenTo(this.collection, "sync add", this.render)
    this.listenTo(this.model, "sync add", this.render);
    this.institutions = options.institutions;
    this.listenTo(this.institutions, "sync add", this.render)
  },

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
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true })
      },
      error: function(){
        //show error on new form
      }
    })
  }
})
