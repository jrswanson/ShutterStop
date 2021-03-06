Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    get '/users/follows', to: 'users#follows'
    resources :users, only: [:index, :show, :create, :update]
    resource :session, only: [:create, :destroy]
    resources :photos, only: [:create, :update, :destroy, :index, :show]
    get 'photos/:photo_id/comments', to: 'photos#comments'
    resources :comments, only: [:index, :create, :destroy]
    resources :follows, only: [:index, :create, :destroy]
    resources :likes, only: [:index, :create, :destroy]
  end
end
