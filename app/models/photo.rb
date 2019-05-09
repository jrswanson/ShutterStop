# == Schema Information
#
# Table name: photos
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  category    :string           not null
#  description :text
#  keywords    :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Photo < ApplicationRecord
    validates :title, :category, :user_id, presence: true
    validate :ensure_photo

    has_one_attached :photo
    belongs_to :user

    has_many :comments

    def ensure_photo
        unless self.photo.attached?
            errors[:photo] << "must be attached"
        end
    end
end
