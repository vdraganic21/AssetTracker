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
        public DbSet<AssetZoneHistory> AssetZoneHistory { get; set; }

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
            modelBuilder.Entity<Zone>().Property(z => z.Points).HasConversion(new PointsConverter());

            // Configure PositionHistories
            modelBuilder.Entity<PositionHistory>().ToTable("positionhistories");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.Id).HasColumnName("id");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.AssetId).HasColumnName("assetid");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.FloorMapId).HasColumnName("floormapid");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.X).HasColumnName("x");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.Y).HasColumnName("y");
            modelBuilder.Entity<PositionHistory>().Property(ph => ph.Timestamp).HasColumnName("datetime");

            // Configure AssetZoneHistory
            modelBuilder.Entity<AssetZoneHistory>().ToTable("assetzonehistory");
            modelBuilder.Entity<AssetZoneHistory>().Property(azh => azh.Id).HasColumnName("id");
            modelBuilder.Entity<AssetZoneHistory>().Property(azh => azh.AssetId).HasColumnName("assetid");
            modelBuilder.Entity<AssetZoneHistory>().Property(azh => azh.ZoneId).HasColumnName("zoneid");
            modelBuilder.Entity<AssetZoneHistory>().Property(azh => azh.EnterDateTime).HasColumnName("enterdatetime");
            modelBuilder.Entity<AssetZoneHistory>().Property(azh => azh.ExitDateTime).HasColumnName("exitdatetime");
            modelBuilder.Entity<AssetZoneHistory>().Property(azh => azh.RetentionTime).HasColumnName("retentiontime");
        }
    }
}