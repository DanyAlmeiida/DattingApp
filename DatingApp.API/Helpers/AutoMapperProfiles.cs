using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault( p => p.IsMain).url))
                        .ForMember(dest => dest.Age, 
                            opt => opt.MapFrom(src => src.DateOfBirth.CalcAge()));

            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault( p => p.IsMain).url))
                        .ForMember(dest => dest.Age, 
                            opt => opt.MapFrom(src => src.DateOfBirth.CalcAge()));
                            
            CreateMap<Photo, PhotosForDetailDto>();

            CreateMap<UpdateUserDto,User>();
        }
    }
}