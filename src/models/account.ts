import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export type AccountType = {
  id: string;
  name: string;
};

class Account implements AccountType {
  id: string;
  name: string;

  constructor(_id: string, _name: string) {
    this.id = _id;
    this.name = _name;
  }
}

export const accountConverter = {
  toFirestore: (account: Account) => {
    return {
      id: account.id,
      name: account.name,
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new Account(data?.id, data?.name);
  },
};
