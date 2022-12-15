import { DocumentSnapshot, FieldValue, SnapshotOptions } from "firebase/firestore";

export type CharacterType = {
  id: number;
  name: string;
  kana: string;
  title: string;
  age: number;
  gender: string;
  profession: string;
  home: string;
  rank: string;
  family: string;
  skills: Array<{ name: string; value: number }>;
  specialities: Array<{ name: string; value: number }>;
  damage: number;
  memo: string;
  tags: Array<string>;
  userId: string;
  images: Array<{ id: number; description: string }>;
  isPublishing: boolean;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

class Character implements CharacterType {
  id: number;
  name: string;
  kana: string;
  title: string;
  age: number;
  gender: string;
  profession: string;
  home: string;
  rank: string;
  family: string;
  skills: Array<{ name: string; value: number }>;
  specialities: Array<{ name: string; value: number }>;
  damage: number;
  memo: string;
  tags: Array<string>;
  userId: string;
  images: Array<{ id: number; description: string }>;
  isPublishing: boolean;
  createdAt: FieldValue;
  updatedAt: FieldValue;

  constructor(
    _id: number,
    _name: string,
    _kana: string,
    _title: string,
    _age: number,
    _gender: string,
    _profession: string,
    _home: string,
    _rank: string,
    _family: string,
    _skills: Array<{ name: string; value: number }>,
    _specialities: Array<{ name: string; value: number }>,
    _damage: number,
    _memo: string,
    _tags: Array<string>,
    _userId: string,
    _images: Array<{ id: number; description: string }>,
    _isPublishing: boolean,
    _createdAt: FieldValue,
    _updatedAt: FieldValue
  ) {
    this.id = _id;
    this.name = _name;
    this.kana = _kana;
    this.title = _title;
    this.age = _age;
    this.gender = _gender;
    this.profession = _profession;
    this.home = _home;
    this.rank = _rank;
    this.family = _family;
    this.skills = _skills;
    this.specialities = _specialities;
    this.damage = _damage;
    this.memo = _memo;
    this.tags = _tags;
    this.userId = _userId;
    this.images = _images;
    this.isPublishing = _isPublishing;
    this.createdAt = _createdAt;
    this.updatedAt = _updatedAt;
  }
}

export const characterConverter = {
  toFirestore: (character: Character) => {
    return {
      id: character.id,
      name: character.name,
      kana: character.kana,
      title: character.title,
      age: character.age,
      gender: character.gender,
      profession: character.profession,
      home: character.home,
      rank: character.rank,
      family: character.family,
      skills: character.skills,
      specialities: character.specialities,
      damage: character.damage,
      memo: character.memo,
      tags: character.tags,
      userId: character.userId,
      images: character.images,
      isPublishing: character.isPublishing,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new Character(
      data?.id,
      data?.name,
      data?.kana,
      data?.title,
      data?.age,
      data?.gender,
      data?.profession,
      data?.home,
      data?.rank,
      data?.family,
      data?.skills,
      data?.specialities,
      data?.damage,
      data?.memo,
      data?.tags,
      data?.userId,
      data?.images,
      data?.isPublishing,
      data?.createdAt,
      data?.updatedAt
    );
  },
};
