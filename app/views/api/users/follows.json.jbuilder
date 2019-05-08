json.array! @followed_photos do |photo|
    json.extract! photo, :id, :title, :category, :description, :keywords, :user_id, :created_at
    json.photoURL url_for(photo.photo)
end