import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export type MetadataType = {
  characterId: number;
};

class Metadata implements MetadataType {
  characterId: number;
  constructor(_characterId: number) {
    this.characterId = _characterId;
  }
}

export const metadataConverter = {
  toFirestore: (metadata: Metadata) => {
    return { characterId: metadata.characterId };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new Metadata(data?.characterId);
  },
};
