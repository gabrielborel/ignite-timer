import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { CyclesContextProvider, useCycles } from '../../contexts/CyclesContext';
import { CycleCountdown } from './components/CycleCountdown';
import { NewCycleForm } from './components/NewCycleForm';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';

interface NewCycleFormValues {
  task: string;
  minutesAmount: number;
}

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useCycles();

  const newCycleForm = useForm<NewCycleFormValues>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  const handleCreateNewCycle = (data: NewCycleFormValues) => {
    createNewCycle(data);
    reset();
  };

  const handleInterruptCycle = () => interruptCurrentCycle();

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CycleCountdown />

        {activeCycle ? (
          <StopCountdownButton type='button' onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
