require 'nokogiri'

class Icon < Bridgetown::Component
  # @@icons = %w[arrow-right-up-line arrow-left arrow-right arrow-down]
  @@icons_dir = Bridgetown::Current.site.root_dir + "/frontend/icons/"

  def initialize(name, size: 16, alt: nil, classes: nil, **attributes)
    # @TODO: reapply the checks once we have a proper website
    # unless @@icons.include?(name)
    #   raise "Unknown icon: #{name}. Existing icons: #{@@icons.join(', ')}."
    # end
    # unless File.exist?("#{@@icons_dir}#{name}.svg")
    #   raise "Icon file not found: #{name}.svg. Add it to the frontend/icons directory."
    # end

    @name = name
    @size = size

    svg_file_content = File.read("#{@@icons_dir}#{@name}.svg")
    dom = Nokogiri::HTML(svg_file_content)
    dom.at('svg').remove_attribute('xmlns')
    dom.at('svg')['data-name'] = @name
    dom.at('svg')['width'] = @size
    dom.at('svg')['height'] = @size
    dom.at('svg')['class'] = classes if classes
    if alt
      dom.at('svg')['aria-label'] = alt
      dom.at('svg')['role'] = 'img'
    else
      dom.at('svg')['aria-hidden'] = 'true'
    end
    # apply additional attributes after everything else in case we want to override any defaults
    attributes.each do |key, value|
      dom.at('svg')[key] = value
    end
    @svg_dom = dom.at('svg').to_html
  end

  def render_in(view_context, &block)
    @svg_dom
  end
end
