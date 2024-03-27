import { Button } from '@repo/ui';

const Page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-3xl font-bold">Shadcn Button</h1>

      <div className="flex space-x-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
};

export default Page;
