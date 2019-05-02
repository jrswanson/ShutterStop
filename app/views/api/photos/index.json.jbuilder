@photos.each do |photo|
    json.set! photo.id do
        json.extract! photo, :id, :title, :category, :description, :keywords, :user_id
        json.photoURL url_for(photo.photo)
    end
end