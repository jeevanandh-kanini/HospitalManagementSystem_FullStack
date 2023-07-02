using Microsoft.EntityFrameworkCore;
using NuGet.DependencyResolver;

namespace HospitalManagementServer.Models
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }


        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<RegisterUser> RegisterUser { get; set; }

        public DbSet<DoctorPatient> DoctorPatients { get; set; }

        public DbSet<Appointment> Appointments { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<DoctorPatient>()
                .HasKey(st => new { st.PatientId, st.DoctorId });

            modelBuilder.Entity<DoctorPatient>()
                .HasOne(st => st.Patient)
                .WithMany(s => s.DoctorPatients)
                .HasForeignKey(st => st.PatientId);





        }


    }
}
