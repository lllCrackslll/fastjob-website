"use client";

import { Filter } from "lucide-react";
import { SECTORS, CONTRACT_TYPES } from "@/lib/mock-data";
import type { Sector, ContractType } from "@/lib/mock-data";

export interface OfferFiltersState {
  sectors: Sector[];
  contractTypes: ContractType[];
  minRate: number;
  search: string;
  quartier: string;
}

interface OfferFiltersProps {
  filters: OfferFiltersState;
  onChange: (filters: OfferFiltersState) => void;
}

export default function OfferFilters({ filters, onChange }: OfferFiltersProps) {
  const toggleSector = (sector: Sector) => {
    const sectors = filters.sectors.includes(sector)
      ? filters.sectors.filter((s) => s !== sector)
      : [...filters.sectors, sector];
    onChange({ ...filters, sectors });
  };

  const toggleContract = (type: ContractType) => {
    const contractTypes = filters.contractTypes.includes(type)
      ? filters.contractTypes.filter((t) => t !== type)
      : [...filters.contractTypes, type];
    onChange({ ...filters, contractTypes });
  };

  return (
    <div className="glass-card p-5">
      <div className="mb-5 flex items-center gap-2">
        <Filter className="h-4 w-4 text-electric" />
        <h3 className="font-semibold text-white">Filtres</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
            Recherche
          </label>
          <input
            type="text"
            placeholder="Métier, entreprise..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full rounded-xl border border-night-border/70 bg-night-muted/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-electric/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
            Quartier
          </label>
          <select
            value={filters.quartier}
            onChange={(e) => onChange({ ...filters, quartier: e.target.value })}
            className="w-full rounded-xl border border-night-border/70 bg-night-muted/40 px-3 py-2.5 text-sm text-white focus:border-electric/50 focus:outline-none"
          >
            <option value="">Tous les quartiers</option>
            <option value="Centre-ville">Centre-ville</option>
            <option value="Beaulieu">Beaulieu</option>
            <option value="Villejean">Villejean</option>
            <option value="Gare">Gare</option>
            <option value="Atalante">Atalante</option>
            <option value="Saint-Grégoire">Saint-Grégoire</option>
            <option value="Rennes Sud">Rennes Sud</option>
          </select>
        </div>

        <div>
          <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-slate-500">
            Secteurs
          </label>
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((sector) => (
              <button
                key={sector}
                onClick={() => toggleSector(sector)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.sectors.includes(sector)
                    ? "border-electric/50 bg-electric/10 text-electric"
                    : "border-night-border text-slate-400 hover:border-night-muted"
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-slate-500">
            Type de contrat
          </label>
          <div className="flex flex-wrap gap-2">
            {CONTRACT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => toggleContract(type)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.contractTypes.includes(type)
                    ? "border-electric/50 bg-electric/10 text-electric"
                    : "border-night-border text-slate-400 hover:border-night-muted"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
            Taux horaire minimum
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={12}
              max={15}
              step={0.1}
              value={filters.minRate}
              onChange={(e) =>
                onChange({ ...filters, minRate: parseFloat(e.target.value) })
              }
              className="flex-1 accent-electric"
            />
            <span className="min-w-[4rem] text-sm font-semibold text-electric">
              {filters.minRate.toFixed(1).replace(".", ",")}€
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            onChange({
              sectors: [],
              contractTypes: [],
              minRate: 12,
              search: "",
              quartier: "",
            })
          }
          className="btn-ghost w-full !py-2 text-xs"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}
