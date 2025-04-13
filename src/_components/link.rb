# Just an alias of the Button component to easily create links that look like… links
#
# To generate buttons that look like links, are links that look like buttons, use the Button component
class Link
  def self.new(text, href:, variant: "arrow", **attributes)
    Button.new(text, href: href, variant: "link", icon: (variant === "arrow") ? "arrow-right-up-line" : nil, **attributes)
  end
end
