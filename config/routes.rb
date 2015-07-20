Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json } do
    resources :accounts, only: [:show, :index, :create, :destroy]
    resources :institutions, only: [:show, :index, :create]
    resources :transactions, only: [:show, :index, :create]
    resources :budgets, only: [:show, :index, :create]
    resources :budget_instructions, only: [:show, :index, :create]
  end
end
