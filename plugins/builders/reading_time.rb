# taken inspiration from https://github.com/risan/jekyll-reading-time, MIT license

require "nokogiri"

class Builders::ReadingTime < SiteBuilder
  # tinker with this value if reading times returned are too weird
  @@words_per_minute = 200

  def build
    helper "reading_time" do |html|
      dom = Nokogiri::HTML(strip_pre_tags(html))

      total_words = dom.inner_text.split.size

      second_plural = "seconds"
      minute_singular = "minute"
      minute_plural = "minutes"

      case total_words
      when 0..89
        "30 #{second_plural} read"
      when 90..269
        "1 #{minute_singular} read"
      when 270..449
        "2 #{minute_plural} read"
      when 450..629
        "3 #{minute_plural} read"
      when 630..809
        "4 #{minute_plural} read"
      when 810..990
        "5 #{minute_plural} read"
      else
        minutes = (total_words / @@words_per_minute).floor
        "#{minutes} #{minute_plural} read"
      end
    end
  end

  def strip_pre_tags(html)
    empty = "".freeze
    html.to_s.gsub(/<pre(?:(?!<\/pre).|\s)*<\/pre>/mi, empty)
  end
end
