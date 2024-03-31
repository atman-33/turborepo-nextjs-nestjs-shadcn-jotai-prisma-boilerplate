import { gql } from '@/lib/graphql-client';
import {
  DummyCreateInput,
  DummyUpdateInput,
  DummyWhereUniqueInput,
} from '@repo/data-access-graphql';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { dummyAtomFamily, dummyIdsAtom } from '../stores/dummy-atom';

const useDummyDispatcher = () => {
  const loadDummies = useAtomCallback(
    useCallback(async (get, set) => {
      const res = await gql.getDummies();
      res.dummies?.map((d) => set(dummyAtomFamily({ id: d.id }), d));
      set(
        dummyIdsAtom,
        res.dummies?.map((d) => d.id),
      );

      return res.dummies;
    }, []),
  );

  const createDummy = useAtomCallback(
    useCallback(async (get, set, { data }: { data: DummyCreateInput }) => {
      const res = await gql.createDummy({ data });
      dummyAtomFamily(res.createDummy);

      if (!get(dummyIdsAtom).includes(res.createDummy.id)) {
        set(dummyIdsAtom, [...get(dummyIdsAtom), res.createDummy.id]);
      }
      return res.createDummy;
    }, []),
  );

  const updateDummy = useAtomCallback(
    useCallback(
      async (
        get,
        set,
        { data, where }: { data: DummyUpdateInput; where: DummyWhereUniqueInput },
      ) => {
        const res = await gql.updateDummy({ where: where, data: data });
        set(dummyAtomFamily({ id: res.updateDummy.id }), res.updateDummy);
        return res.updateDummy;
      },
      [],
    ),
  );

  const deleteDummy = useAtomCallback(
    useCallback(async (get, set, { where }: { where: DummyWhereUniqueInput }) => {
      const res = await gql.deleteDummy({ where: where });
      dummyAtomFamily.remove(res.deleteDummy);
      const ids = get(dummyIdsAtom);
      set(
        dummyIdsAtom,
        ids.filter((id) => id !== res.deleteDummy.id),
      );
      return res.deleteDummy.id;
    }, []),
  );

  return {
    loadDummies,
    createDummy,
    updateDummy,
    deleteDummy,
  };
};

export { useDummyDispatcher };
