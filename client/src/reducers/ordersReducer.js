import { POST_ORDER } from "../actions/types";

export default function(oldState = null, action) {
  Object.freeze(oldState);

  switch (action.type) {
    default:
      return oldState;
  }
}

