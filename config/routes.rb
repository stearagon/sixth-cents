Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json } do
    resources :accounts, only: [:show, :index]
    resources :institutions, only: [:show, :index]
    # resources :users
    # resources :institutions
  end
end
