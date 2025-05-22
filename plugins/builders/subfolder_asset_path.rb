class Builders::SubfolderAssetPath < SiteBuilder
  def build
    helper "subfolder_asset_path" do |subfolder, asset_type|
      path = Bridgetown::Utils.parse_frontend_manifest_file(site, asset_type.to_s)
      "/#{subfolder.chomp("/")}/#{path.delete_prefix("/")}"
    end
  end
end
