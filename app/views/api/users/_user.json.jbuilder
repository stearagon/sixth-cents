json.(user, :id, :name, :email)
json.image_url asset_path(user.image.url(:original))
