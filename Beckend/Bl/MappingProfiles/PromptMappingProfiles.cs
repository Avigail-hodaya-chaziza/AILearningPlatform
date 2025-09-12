using Bl.DTOs;
using AutoMapper;
using Dal.Models;
using Bl.Dtos;

namespace Bl.MappingProfiles
{
    public class PromptMappingProfiles : Profile
    {
        public PromptMappingProfiles()
        {
            // Ensure the AutoMapper Profile base class is properly initialized  
            CreateMap<PromptRequestDto, Prompt>();
            CreateMap<Prompt, PromptResponseDto>()
                           .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                           .ForMember(dest => dest.SubCategoryName, opt => opt.MapFrom(src => src.SubCategory.Name));
        }
    }
}
