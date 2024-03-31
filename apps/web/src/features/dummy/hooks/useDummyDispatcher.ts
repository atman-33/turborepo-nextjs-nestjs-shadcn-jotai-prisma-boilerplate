import { gql } from '@/lib/graphql-client';
import {
  Dummy,
  DummyCreateInput,
  DummyUpdateInput,
  DummyWhereUniqueInput,
} from '@repo/data-access-graphql';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { dummyAtomFamily, dummyIdsAtom } from '../stores/dummy-atom';

const useDummyDispatcher = () => {
  const [ids, setIds] = useAtom(dummyIdsAtom);

  const loadDummies = useCallback(async () => {
    const res = await gql.getDummies();
    res.dummies?.map((d) => dummyAtomFamily(d));
    setIds(res.dummies?.map((d) => d.id));

    return res.dummies;
  }, []);

  const createDummy = useCallback(
    async ({ data }: { data: DummyCreateInput }): Promise<Dummy> => {
      const res = await gql.createDummy({ data });
      dummyAtomFamily(res.createDummy);

      if (!ids.includes(res.createDummy.id)) {
        setIds([...ids, res.createDummy.id]);
      }

      return res.createDummy;
    },
    [ids],
  );

  const updateDummy = useCallback(
    async ({ data, where }: { data: DummyUpdateInput; where: DummyWhereUniqueInput }) => {
      const res = await gql.updateDummy({ where: where, data: data });
      dummyAtomFamily(res.updateDummy);
      return res.updateDummy;
    },
    [],
  );

  const deleteDummy = useCallback(
    async ({ where }: { where: DummyWhereUniqueInput }) => {
      const res = await gql.deleteDummy({ where: where });
      dummyAtomFamily.remove(res.deleteDummy);
      setIds(ids.filter((id) => id !== res.deleteDummy.id));
      return res.deleteDummy.id;
    },
    [ids],
  );

  return {
    loadDummies,
    createDummy,
    updateDummy,
    deleteDummy,
  };
};

export { useDummyDispatcher };
