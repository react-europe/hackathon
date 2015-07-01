class CreateActions < ActiveRecord::Migration
  def change
    create_table :actions do |t|
      t.string :type
      t.integer :initiator_id
      t.integer :recipient_id
      t.integer :code
      t.json :meta

      t.timestamps null: false
    end
  end
end
