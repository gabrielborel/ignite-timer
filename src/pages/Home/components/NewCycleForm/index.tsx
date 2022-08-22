import { useForm } from 'react-hook-form';
import { FormContainer, TaskInput, MinutesAmountInput } from './styles';

interface NewCycleFormValues {
  task: string;
  minutesAmount: number;
}

export const NewCycleForm = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormValues>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  return (
    <FormContainer>
      <label htmlFor='task'>Vou trabalhar em</label>
      <TaskInput
        type='text'
        list='task-suggestions'
        id='task'
        placeholder='Dê um nome para o seu projeto'
        disabled={!!activeCycle}
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
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
};
