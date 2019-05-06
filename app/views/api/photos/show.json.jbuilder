json.extract! @photo, :id, :title, :category, :description, :keywords, :user_id
json.photoURL url_for(@photo.photo)