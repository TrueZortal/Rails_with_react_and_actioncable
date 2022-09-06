Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :messages, only: [:index, :create]
  mount ActionCable.server => '/cable'
end
