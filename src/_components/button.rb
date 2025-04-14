class Button < Bridgetown::Component
  def initialize(text, href: nil, icon: nil, width: "fit", size: "normal", variant: "primary", **attributes)
    unless %w[primary primary-square primary-light aqua seashell outline outline-square link].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: primary, primary-square, primary-light, aqua, seashell, outline, outline-square, link."
    end
    unless %w[fit full].include?(width)
      raise "Invalid width: #{width}. Allowed widths: fit, full."
    end
    unless %w[normal small].include?(size)
      raise "Invalid size: #{size}. Allowed sizes: normal, small."
    end
    @text = text
    @href = href
    @icon = icon
    @size = size
    @width = width
    @attributes = attributes
    @variant = if @attributes[:disabled]
      (variant != "link") ? "primary" : variant
    else
      variant
    end
    # `disabled` on <a> tags is not supported: simulate it with tabindex and aria-hidden
    if @attributes[:disabled]
      @attributes["data-disabled"] = @attributes[:disabled]
      @attributes["tabindex"] = "-1"
      @attributes["aria-hidden"] = "true"
    end
  end
end
