import { Dummy } from '@repo/data-access-graphql';
import { atom, useAtomValue } from 'jotai';
import { atomFamily } from 'jotai/utils';

export type PartialDummy = Partial<Dummy>;

export const dummyAtomFamily = atomFamily(
  (dummy: PartialDummy) => atom(dummy),
  (a: PartialDummy, b: PartialDummy) => a.id === b.id,
);

export const dummyIdsAtom = atom<string[]>([]);

const dummiesAtom = atom<PartialDummy[]>((get) => {
  const ids = get(dummyIdsAtom);
  return ids.map((id) =>
    get(
      dummyAtomFamily({
        id,
      }),
    ),
  );
});

export const dummySelectors = {
  useGetDummies: () => useAtomValue(dummiesAtom),
  useGetDummy: (id: string) => useAtomValue(dummyAtomFamily({ id })),
};
