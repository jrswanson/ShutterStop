# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  liker_id   :integer          not null
#  photo_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ApplicationRecord
    validates :liker_id, :photo_id, presence: true

    belongs_to :photo

    belongs_to :liker,
        foreign_key: :liker_id,
        class_name: :User
end
