import { useMemo } from "react";
import type { Mascot } from "../types/mascot";

type SortOptionValueType = "breed" | "name" | "";

interface SortedMascotsProps {
  mascots: Mascot[];
  selectedSort: SortOptionValueType;
}

export default function useSortedMascots({
  mascots,
  selectedSort,
}: SortedMascotsProps) {
  const sortedMascots = useMemo(() => {
    if (!selectedSort) return mascots;

    return [...mascots].sort((a, b) =>
      a[selectedSort].localeCompare(b[selectedSort]),
    );
  }, [selectedSort, mascots]);

  return sortedMascots;
}
