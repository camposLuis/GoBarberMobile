import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function subscription(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscription/CREATE_SUBSCRIPTION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@subscription/CREATE_SUBSCRIPTION_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@subscription/CANCEL_SUBSCRIPTION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@subscription/CANCEL_SUBSCRIPTION_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@subscription/UPDATE_SUBSCRIPTION_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
