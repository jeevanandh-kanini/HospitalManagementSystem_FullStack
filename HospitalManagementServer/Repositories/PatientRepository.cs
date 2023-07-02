using HospitalManagementServer.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementServer.Repositories
{
    public class PatientRepository:IPatientRepository
    {
        private readonly ApplicationDbContext _context;

        public PatientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Patient>> GetAllPatients()
        {
            return await _context.Patients.Include(s => s.Doctors).ToListAsync();
        }

        public async Task<Patient> GetPatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                return null;
            }

            var doctorIds = await _context.DoctorPatients
                .Where(st => st.PatientId == id)
                .Select(st => st.DoctorId)
                .ToListAsync();

            var doctors = await _context.Doctors
                .Where(t => doctorIds.Contains(t.Id))
                .ToListAsync();

            patient.Doctors = doctors;

            return patient;
        }

        public async Task<Patient> CreatePatient(Patient patient)
        {
            try
            {
                _context.Patients.Add(patient);
                await _context.SaveChangesAsync();
                return patient;
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating patient", ex);
            }
        }

        public async Task<Patient> UpdatePatient(int id, Patient patient)
        {
            try
            {
                var existingPatient = await _context.Patients.FirstOrDefaultAsync(s => s.Id == id);

                if (existingPatient == null)
                {
                    return null;
                }

                existingPatient.Name = patient.Name;

                await _context.SaveChangesAsync();

                return existingPatient;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating patient", ex);
            }
        }

        public async Task<bool> DeletePatient(int id)
        {
            try
            {
                var patient = await _context.Patients.FirstOrDefaultAsync(s => s.Id == id);

                if (patient == null)
                {
                    return false;
                }

                _context.Patients.Remove(patient);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting patient", ex);
            }
        }

        public async Task<bool> AddDoctorToPatient(int patientId, int doctorId)
        {
            try
            {
                var patient = await _context.Patients.FindAsync(patientId);
                var doctor = await _context.Doctors.FindAsync(doctorId);

                if (patient == null || doctor == null)
                {
                    return false;
                }

                var patientDoctor = new DoctorPatient
                {
                    PatientId = patientId,
                    DoctorId = doctorId
                };

                _context.DoctorPatients.Add(patientDoctor);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding doctor to patient", ex);
            }
        }

        public async Task<bool> RemoveDoctorFromPatient(int patientId, int doctorId)
        {
            try
            {
                var patientDoctor = await _context.DoctorPatients.FirstOrDefaultAsync(st => st.PatientId == patientId && st.DoctorId == doctorId);

                if (patientDoctor == null)
                {
                    return false;
                }

                _context.DoctorPatients.Remove(patientDoctor);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error removing doctor from patient", ex);
            }
        }
    }
}
