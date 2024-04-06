import { Link } from '@/components/elements/link';
import { Button } from '@repo/ui';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div>
        <Link href="/">
          <Button variant={'link'}>ホームへ戻る</Button>{' '}
        </Link>
        <Link href="/debug">
          <Button variant={'link'}>Debug Room トップへ戻る</Button>{' '}
        </Link>
      </div>
      <div className="m-4">{children}</div>
    </div>
  );
};

export default Layout;
