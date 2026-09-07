using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MascoLearning.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SecurityHardening_PasswordChangedAtUtc_UserForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PasswordChangedAtUtc",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Progress_AspNetUsers_UserId",
                table: "Progress",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizAttempts_AspNetUsers_UserId",
                table: "QuizAttempts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progress_AspNetUsers_UserId",
                table: "Progress");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizAttempts_AspNetUsers_UserId",
                table: "QuizAttempts");

            migrationBuilder.DropColumn(
                name: "PasswordChangedAtUtc",
                table: "AspNetUsers");
        }
    }
}
