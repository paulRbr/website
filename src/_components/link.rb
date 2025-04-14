# Just an alias of the Button component to easily create links that look like… links
#
# To generate buttons that look like links, are links that look like buttons, use the Button component
class Link
  def self.new(text, href:, variant: "normal", arrow: true, **attributes)
    unless %w[normal white].include?(variant)
      raise "Invalid variant: #{variant}. Allowed variants: normal, white."
    end

    Button.new(
      text,
      href: href,
      variant: (variant === "normal") ? "link" : "link-white",
      icon: arrow ? "arrow-right-up-line" : nil,
      **attributes
    )
  end
end
