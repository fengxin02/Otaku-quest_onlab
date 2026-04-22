using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OtakuQuest.Server.Migrations
{
    /// <inheritdoc />
    public partial class BossOrderSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LastDefeatedBossOrder",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Bosses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastDefeatedBossOrder",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Bosses");
        }
    }
}
