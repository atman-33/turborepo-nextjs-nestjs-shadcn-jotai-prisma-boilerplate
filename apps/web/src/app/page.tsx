import { add } from '@repo/math-helpers';
import { Button } from '@repo/ui';

const Page = () => {
  return (
    <>
      <h1 className="text-xl">Web</h1>
      <p>1 + 2 = {add(1, 2)}</p>

      <Button variant={'default'}>ボタン</Button>
    </>
  );
}

export default Page