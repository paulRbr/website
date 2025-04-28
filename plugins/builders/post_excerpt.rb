require "nokogiri"

class Builders::PostExcerpt < SiteBuilder
  def build
    helper "post_excerpt" do |html|
      cache.getset(html) do
        dom = Nokogiri::HTML(html)
        first_paragraph = dom.at("p")
        first_paragraph.inner_text
      end
    end
  end

  def cache
    @@cache ||= Bridgetown::Cache.new("PostExcerpt")
  end
end
