export enum Actions {
  FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'
}

export type ActionWithoutPayload<T> = {
  type: T,
};

export type ActionWithPayload<T, P> = {
  type: T,
  payload: P,
};
