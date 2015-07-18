Rails.application.routes.draw do

  get '/api', to: 'api#index'
  #we have to somehow hit the index / home route
end
