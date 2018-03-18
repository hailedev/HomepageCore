module.exports = {
    "Logging": {
        "IncludeScopes": false,
        "LogLevel": {
        "Default": "Debug",
        "System": "Information",
        "Microsoft": "Information"
        }
    },
    "ConnectionStrings":{
        "DefaultConnection": "Data Source=HomepageCore.db"
    },
    "OpenIdConnect":{
        "Authority":"http://localhost:5000",
        "RedirectUri":"http://localhost:5001"
    },
    "PageSize": 5
}