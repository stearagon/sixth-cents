SixthCents.Views.Header = Backbone.CompositeView.extend({

  initialize: function(options){
    this.listenTo(SixthCents.currentUser, "signIn signOut", this.render);
    this.render();
  },

  events: {
    "click #sign-out-link": "signOut"
  },

  template: JST['shared/header'],

  render: function(){
    var html = this.template({ currentUser: SixthCents.currentUser });
    this.$el.html(html);

    return this;
  },

  signOut: function(event){
    event.preventDefault();


    SixthCents.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("splash", { trigger: true });
        window.location.replace("/")
      }
    });
  }

});
