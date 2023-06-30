namespace HospitalManagementServer.Models
{
    public class DoctorWithImage
    {
        public string Name { get; set; }
        public string Specialization { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
