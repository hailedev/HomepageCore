using System;
using System.Linq;
using HomepageCore.Data.Entities;
using HomepageCore.Data.Migrations;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace HomepageCore.Data.Extensions
{
    public static class ApplicationDbContextExtensions
    {
        public static void EnsureSeedData(this ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            userManager.CreateAsync(new ApplicationUser { FirstName = "Hai", LastName = "Le", UserName = "hai.le@hotmail.com.au", Email = "hai.le@hotmail.com.au" }, "123Qwerty!kdflkCie").Wait();

            if (!context.Categories.Any(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")))
            {
                context.Categories.Add(new Category
                {
                    Id = new Guid("c3943998-774b-4ac4-9ccd-8e740e20ab2c"),
                    Name = "C# & .Net",
                    Properties = JsonConvert.SerializeObject(new { order = 0 })
                });
            }

            if (!context.Categories.Any(x => x.Id == Guid.Parse("9e8f3cfa-85cb-47f4-a79c-5fc111d47796")))
            {
                context.Categories.Add(new Category
                {
                    Id = new Guid("9e8f3cfa-85cb-47f4-a79c-5fc111d47796"),
                    Name = "Web Development",
                    Properties = JsonConvert.SerializeObject(new {order = 1})
                });
            }

            if (!context.Categories.Any(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")))
            {
                context.Categories.Add(new Category
                {
                    Id = new Guid("ec8f8888-892a-4dd4-99a8-f98c8fd3c754"),
                    Name = "Installer Development",
                    Properties = JsonConvert.SerializeObject(new {order = 2})
                });
            }

            if (!context.Categories.Any(x => x.Id == Guid.Parse("111746b3-274a-4000-a6df-3d7b50e8e732")))
            {
                context.Categories.Add(new Category
                {
                    Id = new Guid("111746b3-274a-4000-a6df-3d7b50e8e732"),
                    Name = "Trips & Events",
                    Properties = JsonConvert.SerializeObject(new {order = 3})
                });
            }
            context.SaveChanges();
            context.Posts.AddPost(new Post
            {
                Id = new Guid("9efa6bf2-7ecf-4947-adfc-6431914da1c6"),
                Title = "Lorem Ipsum 1",
                Content =
                    @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac velit ligula. Etiam malesuada convallis est, et euismod magna laoreet et. Cras vitae lacus eu magna bibendum ultrices vel id sem. Etiam euismod enim neque, non tincidunt quam tristique sed. Duis sagittis faucibus dui sit amet gravida. Suspendisse a nibh venenatis, vehicula enim eu, vulputate libero. Etiam lacinia, erat non congue pharetra, eros massa rutrum magna, nec auctor tortor elit sed purus.
<br/><br/>
Vivamus ut metus vel dolor hendrerit bibendum. Nullam libero turpis, malesuada quis mi nec, ullamcorper suscipit felis. Vivamus purus sapien, molestie a odio luctus, euismod feugiat elit. Maecenas pellentesque nunc erat, at vehicula odio vehicula id. Vestibulum pellentesque gravida lacus et molestie. Suspendisse porta dolor et purus viverra consectetur. Integer consequat enim quis sodales fermentum. Praesent id magna mauris. Quisque ac pretium dui. Nunc semper dui eget congue lacinia. Maecenas posuere ligula dui, at tincidunt risus lobortis quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla diam magna, tincidunt vel pharetra vel, tristique eget sem. Phasellus vel aliquam lectus, at sagittis libero. Nunc varius quis tortor vitae porta.
<br/><br/>
Donec ultricies, justo et pellentesque aliquam, lacus felis hendrerit tortor, eu venenatis purus eros et ipsum. Sed mauris libero, sagittis ut erat vel, egestas mollis velit. Aliquam et orci quam. Nullam convallis molestie ipsum ut vehicula. Integer laoreet pulvinar magna id accumsan. Fusce in pellentesque tortor, sed facilisis justo. Pellentesque quis sapien augue.
<br/><br/>
Integer convallis tempus justo. Curabitur sit amet risus et leo vehicula porta. Nullam auctor ullamcorper est in convallis. Sed et arcu ultricies, fringilla ante nec, venenatis lacus. Donec libero lacus, viverra nec viverra at, tristique a diam. Cras et pharetra lectus. Morbi sollicitudin lacinia justo at suscipit. Sed finibus dictum ornare. Sed et sollicitudin dolor. Curabitur accumsan consectetur massa, sit amet vehicula lectus posuere ut. Sed placerat est sed auctor hendrerit. Fusce vel enim vel elit lacinia consequat. Morbi ullamcorper mauris ex, quis varius ligula eleifend non. Nulla non felis lacus. Suspendisse eu tincidunt ipsum.
<br/><br/>
Nam quis tellus ullamcorper quam finibus sodales ut eu nulla. Pellentesque ac erat nisl. Vivamus eu imperdiet est, non sagittis mi. Cras finibus lacus sit amet scelerisque rutrum. Fusce commodo mauris ac pulvinar condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras accumsan diam vel nibh vehicula, vel tempus magna mollis. Etiam malesuada interdum erat ac hendrerit. Sed venenatis volutpat magna in rhoncus. Nunc congue accumsan tellus a blandit. Nam non ultricies nisi. Sed volutpat eu turpis eget dictum.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")),
                CreatedOn = DateTime.UtcNow.AddDays(-1),
                ModifiedOn = DateTime.UtcNow.AddDays(-1)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("50dcef2D-2d4a-4cfd-a959-6a19490e4b30"),
                Title = "Lorem Ipsum 2",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("9e8f3cfa-85cb-47f4-a79c-5fc111d47796")),
                CreatedOn = DateTime.UtcNow.AddDays(-2),
                ModifiedOn = DateTime.UtcNow.AddDays(-2)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("cb8a9f02-21f5-45d9-a173-53692c3f6e49"),
                Title = "Lorem Ipsum 3",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-3),
                ModifiedOn = DateTime.UtcNow.AddDays(-3)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("075428d9-6f28-40c3-abf5-f36930f04659"),
                Title = "Lorem Ipsum 4",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("111746b3-274a-4000-a6df-3d7b50e8e732")),
                CreatedOn = DateTime.UtcNow.AddDays(-4),
                ModifiedOn = DateTime.UtcNow.AddDays(-4)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("ffdcef2D-2d4a-4cfd-a959-ff19490e4b30"),
                Title = "Lorem Ipsum 5",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-5),
                ModifiedOn = DateTime.UtcNow.AddDays(-5)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("cb8a9f02-2ef5-e5f9-a173-53692cff6e49"),
                Title = "Lorem Ipsum 6",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-6),
                ModifiedOn = DateTime.UtcNow.AddDays(-6)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("0f542fd9-6f28-40c3-abf5-f3a930f0a659"),
                Title = "Lorem Ipsum 7",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-7),
                ModifiedOn = DateTime.UtcNow.AddDays(-7)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("a0dcef2D-2d4a-ecfd-a959-6a19490e4b30"),
                Title = "Lorem Ipsum 8",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-8),
                ModifiedOn = DateTime.UtcNow.AddDays(-8)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("cb8a9f02-21f5-45d9-a173-13612c3f6e49"),
                Title = "Lorem Ipsum 9",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("9e8f3cfa-85cb-47f4-a79c-5fc111d47796")),
                CreatedOn = DateTime.UtcNow.AddDays(-9),
                ModifiedOn = DateTime.UtcNow.AddDays(-9)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("075428d9-6f28-40c3-abf5-f36932f02629"),
                Title = "Lorem Ipsum 10",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("9e8f3cfa-85cb-47f4-a79c-5fc111d47796")),
                CreatedOn = DateTime.UtcNow.AddDays(-10),
                ModifiedOn = DateTime.UtcNow.AddDays(-10)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("504cef24-2d4a-4cfd-a959-ff19490e4b30"),
                Title = "Lorem Ipsum 11",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("9e8f3cfa-85cb-47f4-a79c-5fc111d47796")),
                CreatedOn = DateTime.UtcNow.AddDays(-11),
                ModifiedOn = DateTime.UtcNow.AddDays(-11)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("cb8a9f02-21f5-45f9-a173-56652cff6e49"),
                Title = "Lorem Ipsum 12",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("9e8f3cfa-85cb-47f4-a79c-5fc111d47796")),
                CreatedOn = DateTime.UtcNow.AddDays(-12),
                ModifiedOn = DateTime.UtcNow.AddDays(-12)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("0f8428d9-6f28-40c3-abf5-f36930f04659"),
                Title = "Lorem Ipsum 13",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("9e8f3cfa-85cb-47f4-a79c-5fc111d47796")),
                CreatedOn = DateTime.UtcNow.AddDays(-13),
                ModifiedOn = DateTime.UtcNow.AddDays(-13)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("50dcef2D-2d4a-4cfd-a959-6a19110e4b30"),
                Title = "Lorem Ipsum 14",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")),
                CreatedOn = DateTime.UtcNow.AddDays(-14),
                ModifiedOn = DateTime.UtcNow.AddDays(-14)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("cb8a9f02-21f5-45d9-117a-53692c3f6e49"),
                Title = "Lorem Ipsum 15",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")),
                CreatedOn = DateTime.UtcNow.AddDays(-15),
                ModifiedOn = DateTime.UtcNow.AddDays(-15)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("a75a28d9-6f28-40c3-abf5-f36930f04659"),
                Title = "Lorem Ipsum 16",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")),
                CreatedOn = DateTime.UtcNow.AddDays(-16),
                ModifiedOn = DateTime.UtcNow.AddDays(-16)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("50dcef2D-2d4a-4cfd-a959-ff19490e4bee"),
                Title = "Lorem Ipsum 17",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")),
                CreatedOn = DateTime.UtcNow.AddDays(-17),
                ModifiedOn = DateTime.UtcNow.AddDays(-17)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("cb8a9f02-21f5-55ab-a173-53692cff6e49"),
                Title = "Lorem Ipsum 18",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")),
                CreatedOn = DateTime.UtcNow.AddDays(-18),
                ModifiedOn = DateTime.UtcNow.AddDays(-18)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("0fabcfd9-6f28-40c3-abf5-f36930f04659"),
                Title = "Lorem Ipsum 19",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("c3943998-774b-4ac4-9ccd-8e740e20ab2c")),
                CreatedOn = DateTime.UtcNow.AddDays(-19),
                ModifiedOn = DateTime.UtcNow.AddDays(-19)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("50dcef2D-2d4a-4cfd-a959-6a19490a4b34"),
                Title = "Lorem Ipsum 20",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-20),
                ModifiedOn = DateTime.UtcNow.AddDays(-20)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("bbca9f02-21f5-45d9-a173-53692c3f6e49"),
                Title = "Lorem Ipsum 21",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-21),
                ModifiedOn = DateTime.UtcNow.AddDays(-21)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("07542849-6f28-40c3-abf5-f36930f04659"),
                Title = "Lorem Ipsum 22",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-22),
                ModifiedOn = DateTime.UtcNow.AddDays(-22)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("5fdcef2a-2d4a-4cfd-a9a9-ff19490e4b30"),
                Title = "Lorem Ipsum 23",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-23),
                ModifiedOn = DateTime.UtcNow.AddDays(-23)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("cb8a9fc2-c1f5-45f9-a173-53692cff6e49"),
                Title = "Lorem Ipsum 24",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("ec8f8888-892a-4dd4-99a8-f98c8fd3c754")),
                CreatedOn = DateTime.UtcNow.AddDays(-24),
                ModifiedOn = DateTime.UtcNow.AddDays(-24)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("0f5727d9-7f28-40c3-abf5-f36930f04659"),
                Title = "Lorem Ipsum 25",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("111746b3-274a-4000-a6df-3d7b50e8e732")),
                CreatedOn = DateTime.UtcNow.AddDays(-25),
                ModifiedOn = DateTime.UtcNow.AddDays(-25)
            });

            context.Posts.AddPost(new Post
            {
                Id = new Guid("0f5727dd-af28-40c3-abf5-f36930f04659"),
                Title = "Lorem Ipsum 26",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae arcu sed elit sodales fermentum. Phasellus euismod tempor pharetra. Mauris imperdiet nibh vitae nisl scelerisque vulputate. Nunc ut magna eget tortor laoreet rutrum quis ac erat. Cras et libero et ipsum tristique dictum id quis purus. Nullam bibendum est vitae enim commodo eleifend. Nullam blandit cursus iaculis. Curabitur ut dui nec dolor aliquet dapibus sit amet sit amet erat. Ut ac lacus at turpis iaculis porttitor. Aenean aliquet orci eget arcu dictum, pharetra molestie risus gravida. Nam quam ligula, interdum quis nisi eu, lacinia vulputate mi. Suspendisse facilisis lorem justo, vitae ullamcorper orci interdum a. Praesent malesuada tortor id risus commodo, et congue dolor volutpat. Vivamus vel ligula eget elit varius egestas.",
                Blurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida porttitor tortor, tincidunt facilisis nunc condimentum ac. Integer metus.",
                Category = context.Categories.First(x => x.Id == Guid.Parse("111746b3-274a-4000-a6df-3d7b50e8e732")),
                CreatedOn = DateTime.UtcNow.AddDays(-26),
                ModifiedOn = DateTime.UtcNow.AddDays(-26)
            });

            context.SaveChanges();
        }

        private static void AddPost(this Microsoft.EntityFrameworkCore.DbSet<Post> posts, Post post)
        {
            if (!posts.Any(x => x.Id == post.Id))
            {
                posts.Add(post);
            }
        }
    }
}