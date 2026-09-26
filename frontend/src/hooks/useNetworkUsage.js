import { useEffect, useState } from "react";

export function useNetworkUsage() {
  const [bytesTransferred, setBytesTransferred] = useState(0);

  useEffect(() => {
    const calculateBytes = () => {
      const resources = performance.getEntriesByType("resource");

      const totalBytes = resources.reduce((total, resource) => {
        return total + (resource.transferSize || 0);
      }, 0);

      setBytesTransferred(totalBytes);
    };

    calculateBytes();

    const observer = new PerformanceObserver(calculateBytes);

    observer.observe({ type: "resource", buffered: true });

    return () => observer.disconnect();
  }, []);

  return bytesTransferred;
}
