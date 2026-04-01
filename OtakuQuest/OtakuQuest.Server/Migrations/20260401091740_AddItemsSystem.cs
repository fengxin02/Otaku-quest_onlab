using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OtakuQuest.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddItemsSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EquippedAvatarId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EquippedBackgroundId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EquippedWeaponId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    HpBonus = table.Column<int>(type: "int", nullable: false),
                    StrBonus = table.Column<int>(type: "int", nullable: false),
                    IntBonus = table.Column<int>(type: "int", nullable: false),
                    DefBonus = table.Column<int>(type: "int", nullable: false),
                    HpMultiplier = table.Column<float>(type: "real", nullable: false),
                    StrMultiplier = table.Column<float>(type: "real", nullable: false),
                    IntMultiplier = table.Column<float>(type: "real", nullable: false),
                    DefMultiplier = table.Column<float>(type: "real", nullable: false),
                    ImageAsset = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    AcquiredAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserItems_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_EquippedAvatarId",
                table: "Users",
                column: "EquippedAvatarId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EquippedBackgroundId",
                table: "Users",
                column: "EquippedBackgroundId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EquippedWeaponId",
                table: "Users",
                column: "EquippedWeaponId");

            migrationBuilder.CreateIndex(
                name: "IX_UserItems_ItemId",
                table: "UserItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_UserItems_UserId",
                table: "UserItems",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Items_EquippedAvatarId",
                table: "Users",
                column: "EquippedAvatarId",
                principalTable: "Items",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Items_EquippedBackgroundId",
                table: "Users",
                column: "EquippedBackgroundId",
                principalTable: "Items",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Items_EquippedWeaponId",
                table: "Users",
                column: "EquippedWeaponId",
                principalTable: "Items",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Items_EquippedAvatarId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Items_EquippedBackgroundId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Items_EquippedWeaponId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "UserItems");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Users_EquippedAvatarId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_EquippedBackgroundId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_EquippedWeaponId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EquippedAvatarId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EquippedBackgroundId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EquippedWeaponId",
                table: "Users");
        }
    }
}
