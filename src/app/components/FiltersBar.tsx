"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Info } from "lucide-react"; // lightweight icon library
import { useState } from "react";

interface FiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  onApply: () => void;
}

export const FiltersBar = ({ filters, setFilters, onApply }: FiltersProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSliderChange = (key: string, value: number) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev: any) => ({ ...prev, weatherCodes: e.target.value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: any) => ({ ...prev, search: e.target.value }));
  };

  const InfoIcon = ({ label, text }: { label: string; text: string }) => (
    <span
      className="relative inline-flex items-center ml-2 text-gray-500 cursor-pointer"
      onMouseEnter={() => setHovered(label)}
      onMouseLeave={() => setHovered(null)}
    >
      <Info size={14} />
      {hovered === label && (
        <span className="absolute z-10 top-6 left-0 bg-gray-800 text-white text-xs p-2 rounded-md w-48 shadow-lg">
          {text}
        </span>
      )}
    </span>
  );

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm space-y-4">
      <input
        type="text"
        placeholder="Search by name or city"
        className="border p-2 rounded-md w-full"
        onChange={handleSearchChange}
      />

      <div>
        <label className="text-sm font-medium flex items-center">
          Min Temperature (°C)
          <InfoIcon
            label="tempMin"
            text="Minimum air temperature to filter properties (range -20°C to 50°C)."
          />
        </label>
        <Slider
          min={-20}
          max={50}
          value={filters.tempMin ?? -20}
          onChange={(v) => handleSliderChange("tempMin", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.tempMin ?? -20}°C</p>
      </div>

      <div>
        <label className="text-sm font-medium flex items-center">
          Max Temperature (°C)
          <InfoIcon
            label="tempMax"
            text="Maximum air temperature allowed for search results."
          />
        </label>
        <Slider
          min={-20}
          max={50}
          value={filters.tempMax ?? 50}
          onChange={(v) => handleSliderChange("tempMax", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.tempMax ?? 50}°C</p>
      </div>

      <div>
        <label className="text-sm font-medium flex items-center">
          Min Humidity (%)
          <InfoIcon
            label="humidityMin"
            text="Lowest humidity level acceptable (dryness)"
          />
        </label>
        <Slider
          min={0}
          max={100}
          value={filters.humidityMin ?? 0}
          onChange={(v) => handleSliderChange("humidityMin", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.humidityMin ?? 0}%</p>
      </div>

      <div>
        <label className="text-sm font-medium flex items-center">
          Max Humidity (%)
          <InfoIcon
            label="humidityMax"
            text="Upper humidity level acceptable (stickiness or moist air)."
          />
        </label>
        <Slider
          min={0}
          max={100}
          value={filters.humidityMax ?? 100}
          onChange={(v) => handleSliderChange("humidityMax", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.humidityMax ?? 100}%</p>
      </div>

      <div>
        <label className="text-sm font-medium flex items-center">
          Weather Condition
          <InfoIcon
            label="weather"
            text="Select general weather type such as Clear, Cloudy, Rainy, or Snowy."
          />
        </label>
        <select
          value={filters.weatherCodes ?? ""}
          onChange={handleSelectChange}
          className="border p-2 rounded-md w-full"
        >
          <option value="">Any</option>
          <option value="0">Clear</option>
          <option value="1,2,3">Cloudy</option>
          <option value="51,53,55,57">Drizzle</option>
          <option value="61,63,65,67,80,81,82">Rainy</option>
          <option value="71,73,75,77,85,86">Snow</option>
        </select>
      </div>

      <button
        onClick={onApply}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </div>
  );
};
