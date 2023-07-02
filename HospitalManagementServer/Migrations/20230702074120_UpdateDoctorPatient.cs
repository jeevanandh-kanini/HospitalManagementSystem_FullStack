using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementServer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDoctorPatient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BookingDateTime",
                table: "DoctorPatients",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "BookingId",
                table: "DoctorPatients",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "BookingStatus",
                table: "DoctorPatients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookingDateTime",
                table: "DoctorPatients");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "DoctorPatients");

            migrationBuilder.DropColumn(
                name: "BookingStatus",
                table: "DoctorPatients");
        }
    }
}
