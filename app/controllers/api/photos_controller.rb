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

    def update
        @photo = Photo.find_by(id: params[:id])

        if @photo && logged_in? && current_user.id == @photo.user_id
            if @photo.update(update_params)
                render :show
            else
                render json: @photo.errors.full_messages, status: 404
            end
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    def destroy
        @photo = Photo.find_by(id: params[:id])

        if @photo && logged_in? && current_user.id == @photo.user_id
            @photo.destroy
            render json: {}
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    def comments
        photo = Photo.find_by(id: params[:photo_id])

        if photo
            @comments = photo.comments.order(created_at: :desc)
            render :comments
        else
            render json: ['No photo found'], status: 404
        end
    end

    private

    def photo_params
        params.require(:photo).permit(:title, :category, :description, :keywords, :photo)
    end

    def update_params
        params.require(:photo).permit(:title, :category, :description, :keywords)
    end
end
