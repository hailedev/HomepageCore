using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomepageCore.Common.Configuration;
using HomepageCore.Services.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace HomepageCore.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ApplicationOptions _applicationOptions;

        public EmailSender(IOptions<ApplicationOptions> optionsAccessor)
        {
            _applicationOptions = optionsAccessor.Value;
        }

        public async Task<bool> SendEmailAsync(string email, string subject, string message, string name = "")
        {
            var emailConfig = _applicationOptions.Email;
            var msg = new MimeMessage();
            msg.To.Add(new MailboxAddress("", emailConfig.Admin));
            msg.From.Add(new MailboxAddress(name, email));
            msg.Subject = subject;
            msg.Body = new TextPart(TextFormat.Html) {Text = message};

            try
            {
                using (var client = new SmtpClient())
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.ConnectAsync(emailConfig.Server);
                    await client.AuthenticateAsync(emailConfig.Account, emailConfig.Password);
                    await client.SendAsync(msg);
                    await client.DisconnectAsync(true);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
