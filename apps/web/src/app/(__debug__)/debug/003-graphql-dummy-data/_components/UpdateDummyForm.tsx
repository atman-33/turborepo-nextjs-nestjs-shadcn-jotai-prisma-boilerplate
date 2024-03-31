'use client';

import { useDummyDispatcher } from '@/features/dummy';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

/**
 * フォームのスキーマ。validation もここで定義する。
 */
const formSchema = z.object({
  id: z.string().min(1, { message: '1文字以上入力して下さい' }),
  text: z.string().min(1, { message: '1文字以上入力して下さい' }),
  int: z.number({ required_error: '数字を入力して下さい' }),
});

const UpdateDummyForm = () => {
  const dummyDispatcher = useDummyDispatcher();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      text: '',
      int: 0,
    },
  });

  const updateDummy = () => {
    const dummyToUpdate = {
      id: form.getValues('id'),
      text: form.getValues('text'),
      int: form.getValues('int'),
    };

    dummyDispatcher.updateDummy({
      where: {
        id: dummyToUpdate.id,
      },
      data: {
        text: dummyToUpdate.text,
        int: dummyToUpdate.int,
      },
    });
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(updateDummy)}>
          <FormLabel className="text-base font-bold underline">データ更新</FormLabel>
          <div className="ml-4 flex space-x-2 items-start">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="flex space-x-2 items-baseline">
                  <FormLabel className="w-[50px]">ID</FormLabel>
                  <FormControl className="w-[150px]">
                    <Input placeholder="ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex space-x-2 items-baseline">
                  <FormLabel className="w-[50px]">TEXT</FormLabel>
                  <FormControl className="w-[150px]">
                    <Input placeholder="TEXT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="int"
              render={({ field }) => (
                <FormItem className="flex space-x-2 items-baseline">
                  <FormLabel className="w-[50px]">INT</FormLabel>
                  <FormControl className="w-[150px]">
                    <Input
                      placeholder="write something..."
                      {...field}
                      inputMode="numeric"
                      type="text"
                      onChange={(e) => {
                        const value = e.target.value;
                        const onlyNumberRegex = new RegExp(/^[0-9]*$/);
                        if (onlyNumberRegex.test(value)) {
                          field.onChange(Number(value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <Button type="submit">更新</Button>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateDummyForm;
