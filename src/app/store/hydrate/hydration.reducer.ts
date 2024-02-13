import {
  Action,
  ActionCreator,
  ActionReducer,
  ActionType,
  createReducer,
  ReducerTypes,
} from '@ngrx/store';
import { OnReducer } from '@ngrx/store/src/reducer_creator';

interface RehydrateConfig {
  key: string;
  skipHydrateActions?: Action[];
}

export function createRehydrateReducer<S, A extends Action = Action>(
  config: RehydrateConfig,
  initialState: S,
  ...events: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S, A> {
  const { key } = config;

  if (typeof window === 'undefined') {
    return createReducer(initialState, ...events);
  }

  const item = localStorage.getItem(key);
  const newInitialState = (item && JSON.parse(item)) ?? initialState;
  let newEvents: ReducerTypes<S, ActionCreator[]>[];

  if (config.skipHydrateActions !== undefined) {
    newEvents = events.filter(
      event =>
        !config.skipHydrateActions!.find(_action =>
          event.types.includes(_action.type)
        )
    );
  }

  newEvents = events.map((oldEvent: ReducerTypes<S, ActionCreator[]>) => {
    const reducer: OnReducer<S, ActionCreator[]> = (
      state: S,
      action: ActionType<ActionCreator[][number]>
    ) => {
      const newState = oldEvent.reducer(state, action);
      localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    };

    return {
      ...oldEvent,
      reducer,
    };
  });

  const _events = [...events, ...newEvents];
  return createReducer(newInitialState, ..._events);
}
