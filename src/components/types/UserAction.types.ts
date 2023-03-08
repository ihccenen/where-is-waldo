type Timer = {
  type: 'setStart' | 'setEnd' | 'addScore' | 'restart';
};

type SetUser = {
  type: 'setUsername' | 'setMessage' | 'addFoundCharacter';
  payload: string;
};

export type UserAction = Timer | SetUser;
