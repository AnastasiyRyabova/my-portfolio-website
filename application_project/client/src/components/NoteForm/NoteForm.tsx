import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { FC} from "react";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/Note";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

export interface INoteFormProps {}

const CreateNoteSchema = z.object({
  text: z.string().min(10, 'Текст должен содержать не менее 10 символов').max(300, 'Текст должен содержать не более 300 символов'),
  title: z.string().min(5, 'Заголовок должен содержать не менее 5 символов')
})

type CreateNoteForm = z.infer<typeof CreateNoteSchema>

export const NoteForm: FC<INoteFormProps> = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteSchema)
  })

   const createNoteMutation = useMutation(
    {
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  }, 
  queryClient
  )

  
  return (
    <form className="note-form" onSubmit={handleSubmit(({title, text}) => {
      createNoteMutation.mutate({title, text})
    })}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input 
        type="text" 
        {...register('title')}
       />
      </FormField>

      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea
        {...register('text')}
         />
      </FormField>

      <Button type="submit" title="Сохранить" isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};
