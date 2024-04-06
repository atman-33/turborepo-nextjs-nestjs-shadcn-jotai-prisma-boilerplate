import { Link } from '@/components/elements/link';

const debugPages = [
  '/debug/001-shadcn-button',
  '/debug/002-graphql',
  '/debug/003-graphql-dummy-data',
];

const Page = () => {
  return (
    <div>
      {debugPages.map((page) => {
        return (
          <Link href={page} key={page}>
            <div key={page} className="my-4 rounded-md bg-primary/20 p-2">
              {page}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
