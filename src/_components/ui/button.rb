class Ui::Button < Bridgetown::Component
  def initialize(href: nil, icon: nil, type: 'button', variant: 'default')
    @href, @icon, @type, @variant = href, icon, type, variant
  end
end
