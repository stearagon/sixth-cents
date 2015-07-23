SixthCents.Views.BudgetFormView = Backbone.CompositeView.extend({
  template: JST["budgets/form"],
  events: {
    "click .create-budget" : "submit",
    "click .cancel-form" : "cancel",
    "change input[id=few-months]" : "monthsInput",
    "change input[id=once]" : "onceInput",
    "change input[id=monthly]" : "monthlyInput",
    "change #category" : "checkExists"
  },
  className: "budget-form",
  categoryNames: [
    "Auto Transport",
    "Bills & Utilities",
    "Business Servies",
    "Education",
    "Entertainment",
    "Fees & Charges",
    "Financial",
    "Food & Drinking",
    "Gift & Donations",
    "Health & Fitness",
    "Home",
    "Income",
    "Investments",
    "Kids",
    "Misc Expenses",
    "Personal Care",
    "Pets",
    "Repay Debt",
    "Shopping",
    "Taxes",
    "Transfer",
    "Travel",
    "Hide from Budgets & Trends"
  ],
  initialize: function(options){
    this.budgetInstructions = options.budgetInstructions;
    this.listenTo(this.budgetInstructions, "sync", this.render)
  },
  tagName: "form",
  render: function(){
    var content = this.template({ model: this.model, categories: this.categoryNames });

    this.$el.html(content);

    return this;
  },
  submit: function(event){
    event.preventDefault();
    

    var attrs = this.$el.serializeJSON();

    var budget = this.budgetInstructions.where({ category: attrs.category })

    if (budget.length > 0) {
      this.model = budget[0];
    }

    if (attrs.months === "1"){
      delete attrs.month_denom;
      delete attrs.start_date;
      this.collection = this.budgetInstructions;
    } else if (attrs.month_denom !== "") {
      attrs.months = 1;
      attrs.amount = attrs.amount/attrs.month_denom;
      delete attrs.month_denom;
      delete attrs.start_date;
      this.collection = this.budgetInstructions;
    } else if (attrs.start_date !=="") {
      delete attrs.month_denom;
      delete attrs.months;
      this.model = new SixthCents.Models.Budget();
    }

      this.model.set(attrs);
      this.model.save({}, { success: function() {

          this.collection.add(this.model, { merge: true });
          Backbone.history.navigate("#/budgets", { trigger: true })
          this.remove();
          $(".modal-window-budgets").addClass("display-none");
          $("body").css({ overflow: "scroll"});
        }.bind(this),
        error: function(){
        }
      })
  },
  cancel: function(){
    event.preventDefault();
    this.remove();
    $(".modal-window-budgets").addClass("display-none");
    $("body").css({ overflow: "scroll"});
  },

  monthsInput: function(event){
      $("#hidden-input-months").removeClass("display-none")
      $("#hidden-input-start-month").addClass("display-none")
  },

  onceInput: function(event){
      $("#hidden-input-months").addClass("display-none")
      $("#hidden-input-start-month").removeClass("display-none")
  },

  monthlyInput: function(event){
      $("#hidden-input-months").addClass("display-none")
      $("#hidden-input-start-month").addClass("display-none")
  },
  checkExists: function(){

    var catName = $("#category").val()
    this.budgetInstructions.forEach( function(budget){

      if(catName === budget.get("category")){
        alert ("This will modify already existing budget.")
      }
    })
  }

})
