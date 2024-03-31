'use client';

import { gql } from '@/lib/graphql-client';
import { useEffect } from 'react';

// TODO: env.local が読み込めていないため要修正

const Page = () => {
    useEffect(() => {
        const fetch = async () => {
          const dummies = await gql.queryExample();
          console.log(dummies);
        };
    
        fetch();
      });
      
  return (
    <div>Page</div>
  )
}

export default Page