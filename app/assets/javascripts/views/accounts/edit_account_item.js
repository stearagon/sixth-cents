SixthCents.Views.EditAccountItem = Backbone.CompositeView.extend({
  tagName: "li",
  template: JST["accounts/edit_account_item"],
  events: {
    "click .delete-account" : "delete"
  },

  intialize: function(){
    this.listenTo(this.collection, "add", this.render);
  },
  render: function(){
    var content = this.template({ account: this.model});

    this.$el.html(content);
    this.$el.addClass("group")
    return this;
  },
  delete: function(event){
    event.preventDefault();
    var that = this;

    var id = $(event.currentTarget).data("id");
    var account = this.collection.getOrFetch(id);
    account.destroy()
    $("body").css({ overflow: "scroll"});
    $(".modal-window").addClass("display-none");
  }
})
