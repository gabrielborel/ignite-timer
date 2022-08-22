import { createContext, ReactNode, useContext, useState } from 'react';

interface NewCycleData {
  task: string;
  minutesAmount: number;
}

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextData {
  cycles: ICycle[];
  createNewCycle: (newCycleData: NewCycleData) => void;
  interruptCurrentCycle: () => void;
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
}

const CyclesContext = createContext({} as CyclesContextData);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>('');
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const createNewCycle = (data: NewCycleData) => {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevCycles) => [...prevCycles, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    setCycles((previousCycles) =>
      previousCycles.map((cycle) =>
        cycle.id === activeCycleId ? { ...cycle, interruptedDate: new Date() } : { ...cycle }
      )
    );

    setActiveCycleId(null);
  };

  const markCurrentCycleAsFinished = () => {
    setCycles((previousCycles) =>
      previousCycles.map((cycle) =>
        cycle.id === activeCycleId ? { ...cycle, finishedDate: new Date() } : { ...cycle }
      )
    );
  };

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCycles = () => useContext(CyclesContext);
