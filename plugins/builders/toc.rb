require "nokogiri"

class Builders::Toc < SiteBuilder
  TARGET_HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"]

  def build
    helper "toc" do |html|
      # mostly followed https://avohq.io/blog/dynamic-table-of-contents-rails because I *** at ruby, it's good enough
      cache.getset(html) do
        dom = Nokogiri::HTML(html)
        headings = dom.css("h1, h2, h3, h4, h5, h6")
        toc = []
        last_level = 0
        current_section = toc

        headings.each do |heading|
          level = TARGET_HEADINGS.index(heading.name) + 1

          if level > last_level && !current_section.empty?
            current_section.last[:children] ||= []
            current_section = current_section.last[:children]
          elsif level < last_level
            current_section = toc
          end

          current_section << {
            id: heading["id"],
            text: heading.text.strip,
            level: level
          }
          last_level = level
        end

        toc
      end
    end
  end

  def cache
    @@cache ||= Bridgetown::Cache.new("Toc")
  end
end
