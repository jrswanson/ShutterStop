class Api::CommentsController < ApplicationController
    def index
        @comments = Comment.all
        render :index
    end

    def create
        if logged_in?
            @comment = Comment.new(comment_params)
            @comment.commenter_id = current_user.id

            if @comment.save
                render :show
            else
                render json: @comment.errors.full_messages, status: 404
            end
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])

        if logged_in? && @comment.commenter_id == current_user.id
            @comment.destroy
            render json: {}
        else
            render json: ['Must be logged in, access denied'], status: 404
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :photo_id)
    end
end
