SixthCents.Views.Splash = Backbone.CompositeView.extend({
  template: JST["shared/splash"],
  tagName: "div",
  className: "splash-img",
  events: {
    "submit form": "submit"
  },
  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(SixthCents.currentUser, "signIn", this.signInCallback);
  },
  submit: function(event){
    event.preventDefault();
    var $form = $("#sign-in-guest-container");
    var formData = $form.serializeJSON().user;

    SixthCents.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      success: function() {
        Backbone.history.navigate("", { trigger: true });
      },
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },
  render: function(){
    var content = this.template({ source: "images/finances.jpg" })

    this.$el.html(content)

    return this;
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

})
