import { add } from '@repo/shared-math-helpers';
import { Button } from '@repo/web-ui/components/ui/button';

const Page = () => {
  return (
    <>
      <h1 className="text-xl">Web</h1>
      <p>1 + 2 = {add(1, 2)}</p>

      <Button variant={'ghost'}>ボタン</Button>
    </>
  );
}

export default Page