json.array! @comments do |comment|
    json.extract! comment, :id, :body, :photo_id, :commenter_id, :created_at
end