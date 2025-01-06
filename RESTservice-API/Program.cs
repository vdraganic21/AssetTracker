using Microsoft.EntityFrameworkCore;
using RESTservice_API.Data;

var builder = WebApplication.CreateBuilder(args);

bool useMockData = builder.Configuration.GetValue<bool>("UseMockData");

if (useMockData)
{
    builder.Services.AddSingleton<IAssetRepository, MockAssetRepository>();
    builder.Services.AddSingleton<IPositionHistoryRepository, MockPositionHistoryRepository>();
    builder.Services.AddSingleton<IFloorMapRepository, MockFloorMapRepository>();
}
else
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    builder.Services.AddScoped<IAssetRepository, AssetRepository>();
    builder.Services.AddScoped<IPositionHistoryRepository, PositionHistoryRepository>();
    builder.Services.AddScoped<IFloorMapRepository, FloorMapRepository>();
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
