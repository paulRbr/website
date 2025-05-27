class Builders::Urls < SiteBuilder
  def build
    helper(:signup_path) { "/users/sign_up" }
    helper(:signin_path) { "/users/sign_in" }
    helper(:calendly_url) { "https://calendly.com/bump-sh/discovery-call-bump-sh" }
  end
end
