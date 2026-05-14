import { useState } from "react";

export const useFetching = (callback: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError("");

      await callback();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, isLoading, error] as const;
  // return {
  //   fetchData,
  //   isLoading,
  //   error,
  // };
};
