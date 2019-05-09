# == Schema Information
#
# Table name: comments
#
#  id           :bigint           not null, primary key
#  body         :text             not null
#  edited       :boolean          default(FALSE)
#  photo_id     :integer          not null
#  commenter_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Comment < ApplicationRecord
    validates :body, :photo_id, :commenter_id, presence: true
    validates :edited, inclusion: { in: [true, false] }

    belongs_to :photo

    belongs_to :commenter,
        foreign_key: :commenter_id,
        class_name: :User
end
