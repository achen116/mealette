class ApiController < ApplicationController
	
  def index
    coordinates = { latitude: params[:lat].to_f, longitude: params[:lon].to_f }
    result = Yelp.client.search_by_coordinates(coordinates)
    render json: result.businesses[0..9]
  end

end
