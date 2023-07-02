using HospitalManagementServer.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementServer.Repositories
{
    public class AppointmentRepository:IAppointmentRepository
    {
        private readonly ApplicationDbContext _context;

        public AppointmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Appointment>> GetAllAppointments()
        {
            return await _context.Appointments.ToListAsync();
        }

        public async Task<Appointment> GetAppointmentById(int id)
        {
            return await _context.Appointments.FindAsync(id);
        }

        public async Task AddAppointment(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
        }
        public class NotFoundException : Exception
        {
            public NotFoundException(string message) : base(message)
            {
            }
        }

        public async Task UpdateAppointment(int id, Appointment appointment)
        {
            if (id != appointment.Id)
            {
                throw new ArgumentException("Invalid appointment ID.");
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    throw new NotFoundException("Appointment not found.");
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment != null)
            {
                _context.Appointments.Remove(appointment);
                await _context.SaveChangesAsync();
            }
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(e => e.Id == id);
        }

    }
}
