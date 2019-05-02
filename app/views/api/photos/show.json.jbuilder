json.extract! @photo, :id, :title, :category, :description, :keywords, :user_id
json.photoUrl url_for(@photo.photo)