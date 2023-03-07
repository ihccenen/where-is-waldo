type Timer = {
  type: 'setStart' | 'setEnd' | 'addScore' | 'restart';
};

type SetUser = {
  type: 'setUsername' | 'addFoundCharacter';
  payload: string;
};

export type UserAction = Timer | SetUser;
