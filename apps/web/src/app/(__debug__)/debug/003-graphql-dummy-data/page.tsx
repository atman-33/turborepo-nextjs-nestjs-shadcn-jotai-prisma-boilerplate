'use client';

import { dummySelectors, useDummyDispatcher } from '@/features/dummy';
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui';
import CreateDummyForm from './_components/CreateDummyForm';
import DeleteDummyForm from './_components/DeleteDummyForm';
import UpdateDummyForm from './_components/UpdateDummyForm';

const Page = () => {
  const dummies = dummySelectors.useGetDummies();
  const dummyDispatcher = useDummyDispatcher();

  const handleReloadButtonClick = () => {
    dummyDispatcher.loadDummies();
  };

  return (
    <div className="flex flex-col space-y-4 items-start">
      <div className="flex flex-col space-y-4 items-start">
        <CreateDummyForm />
        <hr className="w-full" />
        <UpdateDummyForm />
        <hr className="w-full" />
        <DeleteDummyForm />
      </div>
      <div className="border-r-2 pr-4">
        <Button variant={'default'} onClick={handleReloadButtonClick}>
          リロード
        </Button>
        <Table className="w-[500px]">
          <TableCaption>A list of dummy table.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>TEXT</TableHead>
              <TableHead className="text-right">INT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummies.map((dummy) => (
              <TableRow key={dummy?.id}>
                <TableCell className="font-medium w-[220px]">{dummy?.id}</TableCell>
                <TableCell className="w-[200px]">{dummy?.text}</TableCell>
                <TableCell className="text-right">{dummy?.int}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$---</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Page;
