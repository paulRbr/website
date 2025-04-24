require "nokogiri"

class Icon < Bridgetown::Component
  @@icons_dir = Bridgetown::Current.site.root_dir + "/frontend/icons/"
  @@available_icons = []

  def initialize(name, size: 16, alt: nil, classes: nil, **attributes)
    unless Icon.available_icons.include?(name)
      raise "Unknown icon: #{name}. See all available icons on /icons page."
    end

    @name = name
    @size = size

    svg_file_content = File.read("#{@@icons_dir}#{@name}.svg")
    dom = Nokogiri::HTML(svg_file_content)
    dom.at("svg").remove_attribute("xmlns")
    dom.at("svg")["data-name"] = @name
    dom.at("svg")["width"] = @size
    dom.at("svg")["height"] = @size
    dom.at("svg")["class"] = "shrink-0"
    if classes
      dom.at("svg")["class"] += " #{classes}"
    end
    if alt
      dom.at("svg")["aria-label"] = alt
      dom.at("svg")["role"] = "img"
    else
      dom.at("svg")["aria-hidden"] = "true"
    end
    # apply additional attributes after everything else in case we want to override any defaults
    attributes.each do |key, value|
      dom.at("svg")[key] = value
    end
    @svg_dom = dom.at("svg").to_html
  end

  def render_in(view_context, &block)
    @svg_dom
  end

  def self.available_icons
    if @@available_icons.empty?
      @@available_icons = Dir.glob("#{@@icons_dir}*.svg").map { |file| File.basename(file).chomp(".svg") }
    end
    @@available_icons
  end
end
