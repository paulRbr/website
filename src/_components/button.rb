class Button < Bridgetown::Component
  def initialize(text, href: nil, icon: nil, size: "auto", variant: "primary", **attributes)
    unless %w[primary primary-square primary-light aqua seashell outline link].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: primary, primary-square, primary-light, aqua, seashell, outline, link."
    end
    unless %w[auto full].include?(size)
      raise "Invalid size: #{size}. Allowed sizes: auto, full."
    end
    @text = text
    @href = href
    @icon = icon
    @size = size
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
