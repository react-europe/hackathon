Rails.application.routes.draw do
  namespace :api do
    resources :auth, only: [:create]
    resources :users, only: [:show] do
      member do
        put :assign_guild
      end
    end
  end
end
