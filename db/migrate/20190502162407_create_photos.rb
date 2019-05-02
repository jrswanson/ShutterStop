class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :title, null: false
      t.string :category, null: false
      t.text :description
      t.text :keywords
      t.integer :user_id, null: false 
      t.timestamps
    end
    add_index :photos, :user_id
  end
end
