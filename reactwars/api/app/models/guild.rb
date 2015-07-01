class Guild < ActiveRecord::Base
  has_many :users

  def self.random_color
    rgb = []
    while rgb.length < 3 do
      if rgb.any?
        rgb.push(
          [
            rgb.last - 62 + (rand * 128).ceil,
            232
          ].min
        )
      else
        rgb.push(
          (255 * rand).ceil
        )
      end
    end

    rgb.shuffle.join(',')
  end
end
