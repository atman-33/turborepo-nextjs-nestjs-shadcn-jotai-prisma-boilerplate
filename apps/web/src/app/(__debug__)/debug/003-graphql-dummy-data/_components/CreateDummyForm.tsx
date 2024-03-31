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
  text: z.string().min(1, { message: '1文字以上入力して下さい' }),
  int: z.number({ required_error: '数字を入力して下さい' }),
});

const CreateDummyForm = () => {
  const dummyDispatcher = useDummyDispatcher();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      int: 0,
    },
  });

  const createDummy = () => {
    const newDummy = {
      text: form.getValues('text'),
      int: form.getValues('int'),
    };

    dummyDispatcher.createDummy({ data: newDummy });
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createDummy)}>
          <FormLabel className="text-base font-bold underline">データ追加</FormLabel>
          <div className="ml-4 flex-col flex space-y-2 items-start">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex space-x-2 items-baseline">
                  <FormLabel className="w-[50px]">TEXT</FormLabel>
                  <FormControl className="w-[210px]">
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
                  <FormControl className="w-[210px]">
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
                  <Button type="submit">追加</Button>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateDummyForm;
