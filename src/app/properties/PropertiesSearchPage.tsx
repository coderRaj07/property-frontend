"use client";
import { useState } from "react";
import { FiltersBar } from "../components/FiltersBar";
import { useProperties } from "../hooks/useProperties";
import { PropertyCard } from "../components/PropertyCard";
import { SkeletonCard } from "../components/SkeletonCard";

export default function PropertiesSearchPage() {
  const [filters, setFilters] = useState<any>({});
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [page, setPage] = useState(1);

  const { data, isFetching } = useProperties(appliedFilters, page);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      <FiltersBar
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isFetching &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        {data?.results?.map((property: any) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1">{page}</span>
        <button
          disabled={!data?.results?.length}
          onClick={() => setPage((p) => p + 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
