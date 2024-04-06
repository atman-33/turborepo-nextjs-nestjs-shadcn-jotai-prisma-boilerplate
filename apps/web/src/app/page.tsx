import { Link } from '@/components/elements/link';
import { Button } from '@repo/ui';

const Page = () => {
  return (
    <div className="flex flex-col items-center space-y-8 m-8">
      <h1 className="text-4xl font-bold text-center">
        Nx Nextjs x Nestjs Tailwindcss Shadcn-ui Prisma Boilerplate
      </h1>

      <Link href="/debug">
        <Button variant="default">Debug Room</Button>
      </Link>
    </div>
  );
};

export default Page;
