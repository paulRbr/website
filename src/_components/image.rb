class Image < Bridgetown::Component
  IMAGE_ATTRS = [
    :responsive,
    :width,
    :height
  ]

  def initialize(path, height: nil, **options)
    @path = "/website/images/" + path
    @height = height
    @options = options
  end

  def svg?
    path.end_with?('.svg')
  end

  def image_attributes
    image_attrs(path, options_for_image_attrs) +
      serialize_attributes(options_without_image_attrs)
  end

  private

  attr_reader :path, :height, :options

  def serialize_attributes(attributes)
    attributes.map do |(key, value)|
      "#{key}=\"#{value}\""
    end.join(" ")
  end

  def options_for_image_attrs
    options.slice(IMAGE_ATTRS)
  end

  def options_without_image_attrs
    options.except(IMAGE_ATTRS)
  end
end
