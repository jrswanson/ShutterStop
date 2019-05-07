class Api::FollowsController < ApplicationController
    def index
        @follows = Follow.all
        render :index
    end

    def create
        if logged_in?
            @follow = Follow.new(follow_params)
            @follow.follower_id = current_user.id

            if @follow.save
                render :show
            else
                render json: @follow.errors.full_messages, status: 404
            end
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    def destroy
        @follow = Follow.find_by(id: params[:id])

        if logged_in? && @follow.follower_id == current_user.id
            @follow.destroy
            render json: {}
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    private

    def follow_params
        params.require(:follow).permit(:followee_id)
    end
end
