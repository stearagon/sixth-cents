SixthCents.Views.Splash = Backbone.CompositeView.extend({
  template: JST["shared/splash"],
  tagName: "div",
  className: "splash-img",
  events: {
    "submit form": "submit"
  },
  submit: function(event){
    event.preventDefault();
    var $form = $("#sign-in-guest-container");
    var formData = $form.serializeJSON().user;

    SixthCents.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      success: function() {
        Backbone.history.navigate("start", { trigger: true });
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
  }

})
