class Api::UsersController < ApplicationController
    def index
        @users = User.all
        render :index
    end

    def show
        @user = User.find_by(id: params[:id])
        
        if @user
            render :show
        else
            render json: ['User not found'], status: 404
        end
    end

    def create
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 404
        end
    end

    def update
        @user = User.find_by(id: params[:id])
    
        if current_user == @user
            if @user.update(update_params);
                render :show
            else
                render json: @user.errors.full_messages, status: 404
            end
        else
            render json: ['Not your account!'], status: 404
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :first_name, :last_name, :password)
    end

    def update_params
        params.require(:user).permit(:email, :first_name, :last_name)
    end
end
