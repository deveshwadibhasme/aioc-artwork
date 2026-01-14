import React, { createContext, useEffect, useState } from 'react';
import fetchData from '../utils/fetch-data';
import type { Artwork } from '../types/artwork-data';
import { useLocation } from 'react-router-dom';

interface DataContextType {
  artworks: any[],
  loading: boolean;
  error: string | null;
  data: any[] | null,
  // setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation()

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const { artworks, pagination } = await fetchData();
      setArtworks(Array.from(artworks.values()));
      setData(pagination)
    } catch (err) {
      console.error("Fetch failed", err);
      setError('Server Error')
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArtworks();
    // setArtworks()
  }, [location.search]);


  return (
    <DataContext.Provider value={{ artworks, loading, error, data }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
