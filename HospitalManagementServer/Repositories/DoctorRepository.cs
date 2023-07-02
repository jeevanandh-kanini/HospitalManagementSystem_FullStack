using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementServer.Repositories
{
    public class DoctorRepository:IDoctorRepository
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public DoctorRepository(ApplicationDbContext dbContext, IWebHostEnvironment hostEnvironment)
        {
            _dbContext = dbContext;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<IEnumerable<DoctorResponse>> GetDoctors(bool? approved = null)
        {
            IQueryable<Doctor> filteredDoctors = _dbContext.Doctors;

            if (approved.HasValue)
            {
                filteredDoctors = filteredDoctors.Where(d => d.Approved == approved.Value);
            }

            IEnumerable<DoctorResponse> doctorResponses = await filteredDoctors.Select(d => new DoctorResponse
            {
                Id = d.Id,
                Name = d.Name,
                Specialization = d.Specialization,
                ImageName = d.ImageName,
                Approved = d.Approved
            }).ToListAsync();

            return doctorResponses;
        }

        public async Task<Doctor> CreateDoctor(DoctorCreateUpdateRequest request)
        {
            Doctor doctor = new Doctor
            {
                Name = request.Name,
                Specialization = request.Specialization,
                ImageName = "",
                Approved = false
            };

            _dbContext.Doctors.Add(doctor);
            await _dbContext.SaveChangesAsync();

            return doctor;
        }

        public async Task<IActionResult> UpdateDoctorApproval(int id, bool approved)
        {
            Doctor doctor = await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Id == id);

            if (doctor == null)
            {
                return new NotFoundResult();
            }

            doctor.Approved = approved;
            await _dbContext.SaveChangesAsync();

            return new NoContentResult();
        }

        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            Doctor doctor = await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Id == id);

            if (doctor == null)
            {
                return new NotFoundResult();
            }

            return new OkObjectResult(doctor);
        }

        public async Task<IActionResult> DeleteDoctor(int id)
        {
            Doctor doctor = await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Id == id);

            if (doctor == null)
            {
                return new NotFoundResult();
            }

            _dbContext.Doctors.Remove(doctor);
            await _dbContext.SaveChangesAsync();

            return new NoContentResult();
        }

        public async Task<IActionResult> UpdateDoctor(int id, DoctorWithImage request)
        {
            Doctor doctor = await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Id == id);

            if (doctor == null)
            {
                return new NotFoundResult();
            }

            doctor.Name = request.Name;
            doctor.Specialization = request.Specialization;

            if (request.ImageFile != null)
            {
                DeleteImage(doctor.ImageName);
                doctor.ImageName = await SaveImage(request.ImageFile);
            }

            await _dbContext.SaveChangesAsync();

            return new NoContentResult();
        }

        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientsByDoctor(int doctorId)
        {
            var patientIds = await _dbContext.DoctorPatients
                .Where(dp => dp.DoctorId == doctorId)
                .Select(dp => dp.PatientId)
                .ToListAsync();

            var patients = await _dbContext.Patients
                .Where(p => patientIds.Contains(p.Id))
                .ToListAsync();

            if (patients.Count == 0)
            {
                return new NotFoundResult();
            }

            return new OkObjectResult(patients);
        }

        private bool DoctorModelExists(int id)
        {
            return _dbContext.Doctors.Any(d => d.Id == id);
        }

        private async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + "_" + Path.GetRandomFileName().Replace(".", "").Substring(0, 10) + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        private void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
