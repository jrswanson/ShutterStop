class Api::LikesController < ApplicationController
    def index
        @likes = Like.all
        render :index
    end

    def create
        if logged_in?
            @like = Like.new(like_params)
            @like.liker_id = current_user.id

            if @like.save
                render :show
            else
                render json: @like.errors.full_messages, status: 404
            end
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])

        if logged_in? && @like.liker_id == current_user.id
            @like.destroy
            render json: {}
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    private

    def like_params
        params.require(:like).permit(:photo_id)
    end
end