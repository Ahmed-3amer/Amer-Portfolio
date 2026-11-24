import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useSmoothScroll } from '@/context/SmoothScrollContext';

interface CvModalContextValue {
  isOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
}

const CvModalContext = createContext<CvModalContextValue | null>(null);

export function CvModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { stopScroll, startScroll } = useSmoothScroll();

  const openCvModal = useCallback(() => {
    stopScroll();
    setIsOpen(true);
  }, [stopScroll]);

  const closeCvModal = useCallback(() => {
    setIsOpen(false);
    startScroll();
  }, [startScroll]);

  const value = useMemo<CvModalContextValue>(
    () => ({ isOpen, openCvModal, closeCvModal }),
    [isOpen, openCvModal, closeCvModal],
  );

  return (
    <CvModalContext.Provider value={value}>{children}</CvModalContext.Provider>
  );
}

export function useCvModal(): CvModalContextValue {
  const context = useContext(CvModalContext);
  if (!context) {
    throw new Error('useCvModal must be used within CvModalProvider');
  }
  return context;
}
