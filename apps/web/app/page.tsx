import { add } from '@repo/shared-math-helpers';

const Page = () => {
  return (
    <>
      <h1 className="text-xl">Web</h1>
      <p>1 + 2 = {add(1, 2)}</p>
    </>
  );
}

export default Page