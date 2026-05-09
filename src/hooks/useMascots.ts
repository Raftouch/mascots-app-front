import { useMemo } from "react";
import type { Mascot, SortableMascotKeys } from "../types/mascot";

interface SortedMascotsProps {
  mascots: Mascot[];
  selectedSort: SortableMascotKeys | "";
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
