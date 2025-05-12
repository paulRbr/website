class Builders::Urls < SiteBuilder
  def build
    helper(:signup_path) { "/users/sign_up" }
    helper(:signin_path) { "/users/sign_in" }
  end
end
