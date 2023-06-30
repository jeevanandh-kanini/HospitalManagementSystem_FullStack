using System.ComponentModel.DataAnnotations;

namespace HospitalManagementServer.DTO
{
    public class RegisterUserDto
    {
        
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }

        public int? Experience { get; set; }  
        public string? Specialization { get; set; }
        public IFormFile? ImageFile { get; set; }








    }
}
