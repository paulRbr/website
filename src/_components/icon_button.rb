class IconButton < Bridgetown::Component
  def initialize(icon, size: 14, href: nil, variant: "primary", alt: nil, **attributes)
    unless %w[primary seashell].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: primary, seashell."
    end
    @href = href
    @icon = icon
    @alt = alt
    @attributes = attributes
    @variant = variant
    @size = size
    if @attributes[:disabled]
      @attributes["data-disabled"] = @attributes[:disabled]
    end
  end
end
