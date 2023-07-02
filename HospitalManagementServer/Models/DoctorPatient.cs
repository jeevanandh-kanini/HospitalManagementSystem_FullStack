using NuGet.DependencyResolver;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementServer.Models
{
    public class DoctorPatient
    {
        [Key]
        [Column(Order = 1)]
        [ForeignKey("Patient")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PatientId { get; set; }

        public Patient Patient { get; set; }

        [Key]
        [Column(Order = 2)]
        [ForeignKey("Doctor")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int DoctorId { get; set; }

        public Doctor Doctor { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Add this attribute to generate the booking ID
        public int BookingId { get; set; } // Add the booking ID property

        public DateTime BookingDateTime { get; set; }

        public string BookingStatus { get; set; }


        public string DiseaseDescription { get; set; }


    }
}