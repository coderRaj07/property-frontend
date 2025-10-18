"use client";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  onApply: () => void;
}

export const FiltersBar = ({ filters, setFilters, onApply }: FiltersProps) => {
  const [errors, setErrors] = useState<{ temp?: string; humidity?: string }>({});

  // 🔍 Validation check
  useEffect(() => {
    const newErrors: any = {};
    if (filters.tempMin > filters.tempMax)
      newErrors.temp = "Min temperature cannot exceed max temperature";
    if (filters.humidityMin > filters.humidityMax)
      newErrors.humidity = "Min humidity cannot exceed max humidity";
    setErrors(newErrors);
  }, [filters]);

  const handleSliderChange = (key: string, value: number) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev: any) => ({ ...prev, weatherCodes: e.target.value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev: any) => ({ ...prev, searchText: e.target.value }));
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm space-y-4">
      <input
        type="text"
        placeholder="Search by name or city"
        className="border p-2 rounded-md w-full"
        onChange={handleSearchChange}
      />

      {/* 🌡 Temperature */}
      <div>
        <label className="text-sm font-medium">Min Temperature (°C)</label>
        <Slider
          min={-20}
          max={50}
          value={filters.tempMin ?? -20}
          onChange={(v) => handleSliderChange("tempMin", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.tempMin ?? -20}°C</p>

        <label className="text-sm font-medium mt-2 block">
          Max Temperature (°C)
        </label>
        <Slider
          min={-20}
          max={50}
          value={filters.tempMax ?? 50}
          onChange={(v) => handleSliderChange("tempMax", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.tempMax ?? 50}°C</p>

        {errors.temp && (
          <p className="text-xs text-red-500 mt-1">{errors.temp}</p>
        )}
      </div>

      {/* 💧 Humidity */}
      <div>
        <label className="text-sm font-medium">Min Humidity (%)</label>
        <Slider
          min={0}
          max={100}
          value={filters.humidityMin ?? 0}
          onChange={(v) => handleSliderChange("humidityMin", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.humidityMin ?? 0}%</p>

        <label className="text-sm font-medium mt-2 block">
          Max Humidity (%)
        </label>
        <Slider
          min={0}
          max={100}
          value={filters.humidityMax ?? 100}
          onChange={(v) => handleSliderChange("humidityMax", v as number)}
        />
        <p className="text-xs text-gray-500">{filters.humidityMax ?? 100}%</p>

        {errors.humidity && (
          <p className="text-xs text-red-500 mt-1">{errors.humidity}</p>
        )}
      </div>

      {/* ☁️ Weather condition */}
      <div>
        <label className="text-sm font-medium">Weather Condition</label>
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

      {/* 🔘 Apply Button */}
      <button
        onClick={onApply}
        disabled={!!errors.temp || !!errors.humidity}
        className={`mt-2 px-4 py-2 rounded-md text-white transition ${
          errors.temp || errors.humidity
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Apply Filters
      </button>
    </div>
  );
};