class Builders::AssetInline < SiteBuilder
  def build
    helper "asset_inline" do |asset_type|
      unless asset_type.to_s == "css" || asset_type.to_s == "js"
        raise "asset_inline only supports css or js"
      end

      path_parts = [
        site.root_dir,
        "output/_bridgetown/static",
        site.frontend_manifest[asset_type.to_s == "css" ? "styles/index.css" : "javascript/index.js"],
      ].join("/")

      if File.exist?(path_parts)
        File.read(path_parts)
      else
        raise "asset_inline only supports styles/index.css or javascript/index.js"
      end
    end
  end
end