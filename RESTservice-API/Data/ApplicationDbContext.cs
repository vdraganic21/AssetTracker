using Microsoft.EntityFrameworkCore;
using RESTservice_API.Models;

namespace RESTservice_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Asset> Assets { get; set; }
        public DbSet<PositionHistory> PositionHistories { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<FloorMap> FloorMaps { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure FloorMaps
            modelBuilder.Entity<FloorMap>().ToTable("floormaps");
            modelBuilder.Entity<FloorMap>().Property(fm => fm.Id).HasColumnName("id");
            modelBuilder.Entity<FloorMap>().Property(fm => fm.Name).HasColumnName("name");
            modelBuilder.Entity<FloorMap>().Property(fm => fm.ImageBase64).HasColumnName("image");

            // Configure Assets
            modelBuilder.Entity<Asset>().ToTable("assets");
            modelBuilder.Entity<Asset>().Property(a => a.Id).HasColumnName("id");
            modelBuilder.Entity<Asset>().Property(a => a.FloorMapId).HasColumnName("floormapid");
            modelBuilder.Entity<Asset>().Property(a => a.Name).HasColumnName("name");
            modelBuilder.Entity<Asset>().Property(a => a.X).HasColumnName("x");
            modelBuilder.Entity<Asset>().Property(a => a.Y).HasColumnName("y");
            modelBuilder.Entity<Asset>().Property(a => a.Active).HasColumnName("active");

            // Configure Zones
            modelBuilder.Entity<Zone>().ToTable("zones");
            modelBuilder.Entity<Zone>().Property(z => z.Id).HasColumnName("id");
            modelBuilder.Entity<Zone>().Property(z => z.FloorMapId).HasColumnName("floormapid");
            modelBuilder.Entity<Zone>().Property(z => z.Name).HasColumnName("name");
            modelBuilder.Entity<Zone>().Property(z => z.Points).HasColumnName("points");

            // Configure PositionHistories
            modelBuilder.Entity<PositionHistory>().ToTable("positionhistories");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.Id).HasColumnName("id");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.AssetId).HasColumnName("assetid");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.FloorMapId).HasColumnName("floormapid");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.X).HasColumnName("x");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.Y).HasColumnName("y");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.Timestamp).HasColumnName("datetime");
        }
    }
}