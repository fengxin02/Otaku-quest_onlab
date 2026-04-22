using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OtakuQuest.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddBossandController : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrentBossHp",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CurrentBossId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Bosses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageAsset = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaxHp = table.Column<int>(type: "int", nullable: false),
                    STR = table.Column<int>(type: "int", nullable: false),
                    INT = table.Column<int>(type: "int", nullable: false),
                    DEF = table.Column<int>(type: "int", nullable: false),
                    RewardXP = table.Column<int>(type: "int", nullable: false),
                    RewardCurrency = table.Column<int>(type: "int", nullable: false),
                    RewardItemId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bosses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bosses_Items_RewardItemId",
                        column: x => x.RewardItemId,
                        principalTable: "Items",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_CurrentBossId",
                table: "Users",
                column: "CurrentBossId");

            migrationBuilder.CreateIndex(
                name: "IX_Bosses_RewardItemId",
                table: "Bosses",
                column: "RewardItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Bosses_CurrentBossId",
                table: "Users",
                column: "CurrentBossId",
                principalTable: "Bosses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Bosses_CurrentBossId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Bosses");

            migrationBuilder.DropIndex(
                name: "IX_Users_CurrentBossId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CurrentBossHp",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CurrentBossId",
                table: "Users");
        }
    }
}
