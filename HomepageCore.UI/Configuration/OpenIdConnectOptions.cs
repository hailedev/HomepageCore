namespace HomepageCore.UI.Configuration
{
    public class OpenIdConnectOptions
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string Authority { get; set; }
        public string RedirectUri { get; set; }
        public string BaseUri { get; set; }
    }
}