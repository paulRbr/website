class Button < Bridgetown::Component
  def initialize(text, href: nil, icon: nil, width: "fit", size: "normal", variant: "primary", dangerous_classes: "", **attributes)
    unless %w[primary primary-square primary-light aqua seashell outline outline-square link link-white].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: primary, primary-square, primary-light, aqua, seashell, outline, outline-square, link, link-white."
    end
    unless %w[fit full].include?(width)
      raise "Invalid width: #{width}. Allowed widths: fit, full."
    end
    unless %w[normal small very-small].include?(size)
      raise "Invalid size: #{size}. Allowed sizes: normal, small, very-small."
    end
    @text = text
    @href = href
    @icon = icon
    @size = size
    @width = width
    @attributes = attributes
    # allow extra classes to be added as an escape hatch, but leave a naming that implies this is not the preferred way to consume this
    @dangerous_classes = dangerous_classes
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
