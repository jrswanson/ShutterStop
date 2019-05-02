class Api::PhotosController < ApplicationController
    def index
        @photos = Photo.all

        render :index
    end

    def show
        @photo = Photo.find_by(id: params[:id])

        if @photo
            render :show
        else
            render json: ["Photo not found"], status: 404
        end
    end

    def create
        if logged_in?
            @photo = Photo.new(photo_params)
            @photo.user_id = current_user.id

            if @photo.save
                render :show
            else
                render json: @photo.errors.full_messages, status: 404
            end
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    def photo_params
        params.require(:photo).permit(:title, :category, :description, :keywords, :photo)
    end
end
