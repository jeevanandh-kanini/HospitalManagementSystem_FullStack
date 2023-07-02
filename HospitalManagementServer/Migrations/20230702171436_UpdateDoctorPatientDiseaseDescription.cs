using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementServer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDoctorPatientDiseaseDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DiseaseDescription",
                table: "DoctorPatients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiseaseDescription",
                table: "DoctorPatients");
        }
    }
}
