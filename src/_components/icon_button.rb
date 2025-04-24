class IconButton < Bridgetown::Component
  def initialize(icon, size: 14, href: nil, variant: "primary", alt: nil, classes: nil, **attributes)
    unless %w[primary seashell transparent].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: primary, seashell, transparent."
    end
    @href = href
    @icon = icon
    @alt = alt
    @attributes = attributes
    @variant = variant
    @size = size
    @classes = classes
    if @attributes[:disabled]
      @attributes["data-disabled"] = @attributes[:disabled]
    end
  end
end
