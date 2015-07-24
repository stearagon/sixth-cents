Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

  namespace :api, defaults: {format: :json } do
    resources :users, only: [:index, :create, :show]
    resource :session, only: [:show, :create, :destroy]
    resources :accounts, only: [:show, :index, :create, :destroy]
    resources :institutions, only: [:show, :index, :create]
    resources :transactions, only: [:show, :index, :create]
    resources :budgets, only: [:show, :index, :create, :update]
    resources :budget_instructions, only: [:show, :index, :create, :update, :destroy]
    resources :bills, only: [:index, :show, :create, :destroy]
  end
end
