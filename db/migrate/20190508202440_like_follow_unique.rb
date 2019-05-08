class LikeFollowUnique < ActiveRecord::Migration[5.2]
  def change
    add_index :follows, [:follower_id, :followee_id], unique: true
    add_index :likes, [:liker_id, :photo_id], unique: true
  end
end
