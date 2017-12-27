using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HomepageCore.Data.Migrations
{
    public partial class Metadata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MetaDescription",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaImage",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaTitle",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetaUrl",
                table: "Posts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MetaDescription",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "MetaImage",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "MetaTitle",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "MetaUrl",
                table: "Posts");
        }
    }
}
