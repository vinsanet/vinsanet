import { DocumentSnapshot, FieldValue, SnapshotOptions } from "firebase/firestore";

type Rule = "基本ルール" | "現代日本ソースブック";
type Skill = { name: string; value: number };
type Speciality = { name: string; value: number };
type Image = { id: string; description: string };

export type CharacterType = {
  id: string;
  name: string;
  kana: string;
  title: string;
  age: string;
  gender: string;
  profession: string;
  home: string;
  rank: string;
  family: string;
  skills: Array<Skill>;
  specialities: Array<Speciality>;
  injury: number;
  remarks: string;
  tags: Array<string>;
  userId: string;
  images: Array<Image>;
  isPublishing: boolean;
  rule: Rule;
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

class Character implements CharacterType {
  id: string;
  name: string;
  kana: string;
  title: string;
  age: string;
  gender: string;
  profession: string;
  home: string;
  rank: string;
  family: string;
  skills: Array<Skill>;
  specialities: Array<Speciality>;
  injury: number;
  remarks: string;
  tags: Array<string>;
  userId: string;
  images: Array<Image>;
  isPublishing: boolean;
  rule: Rule;
  createdAt: FieldValue;
  updatedAt: FieldValue;

  constructor(
    _id: string,
    _name: string,
    _kana: string,
    _title: string,
    _age: string,
    _gender: string,
    _profession: string,
    _home: string,
    _rank: string,
    _family: string,
    _skills: Array<Skill>,
    _specialities: Array<Speciality>,
    _injury: number,
    _remarks: string,
    _tags: Array<string>,
    _userId: string,
    _images: Array<Image>,
    _isPublishing: boolean,
    _rule: Rule,
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
    this.injury = _injury;
    this.remarks = _remarks;
    this.tags = _tags;
    this.userId = _userId;
    this.images = _images;
    this.isPublishing = _isPublishing;
    this.rule = _rule;
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
      injury: character.injury,
      remarks: character.remarks,
      tags: character.tags,
      userId: character.userId,
      images: character.images,
      isPublishing: character.isPublishing,
      rule: character.rule,
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
      data?.injury,
      data?.remarks,
      data?.tags,
      data?.userId,
      data?.images,
      data?.isPublishing,
      data?.rule,
      data?.createdAt,
      data?.updatedAt
    );
  },
};
