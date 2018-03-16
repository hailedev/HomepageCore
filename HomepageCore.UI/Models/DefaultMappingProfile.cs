using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HomepageCore.Data.Entities;

namespace HomepageCore.UI.Models
{
    public class DefaultMappingProfile : Profile
    {
        public DefaultMappingProfile()
        {
            CreateMap<Post, EditablePostModel>()
                    .ForMember(x => x.Day, opt => opt.MapFrom(x => x.CreatedOn.Day))
                    .ForMember(x => x.Month, opt => opt.MapFrom(x => x.CreatedOn.ToString("MMM")))
                    .ReverseMap();

            CreateMap<Post, PostSummaryModel>()
                    .ForMember(x => x.Day, opt => opt.MapFrom(x => x.CreatedOn.Day))
                    .ForMember(x => x.Month, opt => opt.MapFrom(x => x.CreatedOn.ToString("MMM")));

            CreateMap<Post, PostModel>()
                    .ForMember(x => x.Day, opt => opt.MapFrom(x => x.CreatedOn.Day))
                    .ForMember(x => x.Month, opt => opt.MapFrom(x => x.CreatedOn.ToString("MMM")));
        }
    }
}
