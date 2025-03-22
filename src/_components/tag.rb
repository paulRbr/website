class Tag < Bridgetown::Component
  def initialize(text, icon: nil, variant: "pill", **attributes)
    unless %w[pill square aqua seashell].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: pill, square, aqua, seashell."
    end
    @text = text
    @icon = icon
    @attributes = attributes
    @variant = variant
  end
end
