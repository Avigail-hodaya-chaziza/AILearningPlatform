using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Dal.Models;
using Bl.DTOs;


namespace Bl.MappingProfiles
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
        
            CreateMap<UserRequestDTOs, User>();
      
            CreateMap<User, UsersResponseDtos>();
        }
    }
}
