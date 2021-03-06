﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200818062058_SeedValues")]
    partial class SeedValues
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7");

            modelBuilder.Entity("Domain.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Values");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Mishal"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Ibrahim"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Khalaf"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Zack"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Faisal"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Abduallah"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Bader"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
