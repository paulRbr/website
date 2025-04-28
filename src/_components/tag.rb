class Tag < Bridgetown::Component
  def initialize(text, icon: nil, variant: "pill", size: "normal", **attributes)
    unless %w[pill square aqua seashell pill-on-dark].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: pill, square, aqua, seashell, pill-on-dark."
    end
    unless %w[normal small].include?(size)
      raise "Invalid size: #{size}. Allowed sizes: normal, small."
    end
    @text = text
    @icon = icon
    @attributes = attributes
    @variant = variant
    @size = size
  end
end
