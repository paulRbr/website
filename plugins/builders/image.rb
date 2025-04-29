require "image_size"

class Builders::Image < SiteBuilder
  @@use_cloudflare = ENV["IMAGES_MODE"] == "cloudflare"

  def build
    helper :image_attrs, :image_attrs
    helper :image_exists, :image_exists
  end

  # pass an image path (relative to src folder) and optional width/height/cloudflare options
  # and retrieve an html string with src, width and height attributes, and optional srcset for retina screens.
  # If using cloudflare, the image src and srcset are cloudflare image urls.
  def image_attrs(imagepath, options = {})
    begin
      original_image_size = get_image_size(get_filepath(imagepath))
    rescue
      return 'src=""'
    end

    attrs = "src=\"#{image_url(imagepath, options)}\" " + image_size(imagepath, options)

    if !@@use_cloudflare
      return attrs
    end

    # check if we can x2 the image for retina display
    wanted_image_size = get_image_size(get_filepath(imagepath), options)
    if wanted_image_size[:width] * 2 <= original_image_size[:width]
      retina_src = image_url(imagepath, options.merge(width: wanted_image_size[:width] * 2, height: wanted_image_size[:height] * 2))
      attrs += " srcset=\"#{retina_src} 2x\""
    end
    attrs
  end

  def image_exists(imagepath)
    get_filepath(imagepath)
    true
  rescue
    false
  end

  # pass an image path (relative to src folder) and optional cloudflare options
  # and retrieve the new cloudflare image url (or the given path if cloudflare is disabled in env)
  def image_url(imagepath, options = {})
    if !@@use_cloudflare
      return imagepath
    end
    if imagepath.end_with?(".svg")
      return imagepath
    end
    if imagepath.start_with?("/")
      imagepath = imagepath[1..]
    end
    cf_format = options[:format] || "auto"
    options.delete(:format)
    if options[:width]
      options[:width] = options[:width].to_i
    end
    if options[:height]
      options[:height] = options[:height].to_i
    end
    cf_options = ["format=#{cf_format}", *options.map { |key, value| "#{key}=#{value}" }]
    "/cdn-cgi/image/#{cf_options.join(",")}/#{imagepath}"
  end

  # pass an image path (relative to src folder) with optional forced width or height
  # to get width/height html attributes
  #
  # this can then be used in an img tag:
  #   <img src="..." <%=raw img_size_attrs(path) %> />
  #
  # @param imagepath [String] the path to the image. Must be relative to src folder.
  # @param options [Hash] pass a :width or :height to force one size and keep the aspect ratio for the other size
  # @return [String] an already made html string with width and height attributes
  def image_size(imagepath, options = {})
    image_size = get_image_size(get_filepath(imagepath), options)
    "width=\"#{image_size[:width]}\" height=\"#{image_size[:height]}\""
  end

  private

  def get_filepath(imagepath)
    filepath = [site.root_dir, "src", imagepath.sub(/^\//, "")].join("/")
    if File.exist?(filepath)
      filepath
    else
      raise "image not found: src/#{imagepath.sub(/^\//, "")}"
    end
  end

  def get_image_size(filepath, options = {})
    if options[:width] && options[:height]
      return {width: options[:width], height: options[:height]}
    end
    image_size = ImageSize.path(filepath)
    ratio = image_size.width.to_f / image_size.height.to_f
    width = image_size.width
    height = image_size.height
    if options[:width]
      width = options[:width]
      height = options[:width].to_f / ratio.to_f
    end
    if options[:height]
      height = options[:height]
      width = options[:height].to_f * ratio.to_f
    end
    {width: width, height: height}
  end
end
