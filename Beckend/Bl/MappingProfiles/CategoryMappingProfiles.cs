using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.DTOs;
using AutoMapper;
using Dal.Models;

namespace Bl.MappingProfiles
{
    public class CategoryMappingProfiles: Profile
    {
        public CategoryMappingProfiles()
        {
            CreateMap<CategoryRequestDto, Category>();
            CreateMap<SubCategory, SubCategoryResponseDTOs>();

        }
    }
}
