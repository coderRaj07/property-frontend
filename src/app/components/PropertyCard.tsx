export const PropertyCard = ({ property }: { property: any }) => {
    const { name, city, weather } = property;
  
    return (
      <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">{city}</p>
        {weather && (
          <div className="mt-2 text-sm text-gray-700">
            🌡️ {weather.temperature}°C | 💧 {weather.humidity}% | ☁️ {weather.weatherCode}
          </div>
        )}
      </div>
    );
  };
  