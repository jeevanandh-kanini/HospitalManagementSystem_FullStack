namespace HospitalManagementServer.Models
{
    public class DoctorResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Specialization { get; set; }

        public string ImageName { get; set; }

        public int? Experience { get; set; }

        public bool Approved { get; set; }
    }
}
