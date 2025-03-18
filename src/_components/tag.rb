class Tag < Bridgetown::Component
  def initialize(icon: nil, variant: 'pill', **attributes)
    unless %w[pill square aqua seashell].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: pill, square, aqua, seashell."
    end
    @icon = icon
    @attributes = attributes
    @variant = variant
  end
end
