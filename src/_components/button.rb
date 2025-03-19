class Button < Bridgetown::Component
  def initialize(text, href: nil, icon: nil, variant: 'primary', **attributes)
    unless %w[primary aqua seashell outline link].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: primary, aqua, seashell, outline, link."
    end
    @text = text
    @href = href
    @icon = icon
    @attributes = attributes
    @variant = @attributes[:disabled] ? variant != 'link' ? 'primary' : variant : variant
    # `disabled` on <a> tags is not supported: simulate it with tabindex and aria-hidden
    if @attributes[:disabled]
      @attributes["data-disabled"] = @attributes[:disabled]
      @attributes["tabindex"] = "-1"
      @attributes["aria-hidden"] = "true"
    end
  end
end
