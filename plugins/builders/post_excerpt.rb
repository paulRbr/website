require "nokogiri"

class Builders::PostExcerpt < SiteBuilder
  def build
    helper "post_excerpt" do |html|
      dom = Nokogiri::HTML(html)
      first_paragraph = dom.at("p")
      first_paragraph.inner_text
    end
  end
end
