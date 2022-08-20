import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles';

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  const handleCreateNewCycle = (data: any) => {
    console.log(data);
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <TaskInput
            type='text'
            list='task-suggestions'
            id='task'
            placeholder='Dê um nome para o seu projeto'
            {...register('task')}
          />
          <datalist id='task-suggestions'>
            <option value='hehe' />
            <option value='hehe' />
            <option value='hehe' />
            <option value='hehe' />
          </datalist>

          <label htmlFor='minutesDuration'>durante</label>
          <MinutesAmountInput
            type='number'
            id='minutesDuration'
            placeholder='00'
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}