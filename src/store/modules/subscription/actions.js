export function createSubscriptionRequest(id) {
  return {
    type: '@subscription/CREATE_SUBSCRIPTION_REQUEST',
    payload: { id },
  };
}

export function createSubscriptionSuccess() {
  return {
    type: '@subscription/CREATE_SUBSCRIPTION_SUCCESS',
  };
}

export function cancelSubscriptionRequest(id) {
  return {
    type: '@subscription/CANCEL_SUBSCRIPTION_REQUEST',
    payload: { id },
  };
}

export function cancelSubscriptionSuccess() {
  return {
    type: '@subscription/CANCEL_SUBSCRIPTION_SUCCESS',
  };
}

export function createSubscriptionFailure() {
  return {
    type: '@subscription/UPDATE_SUBSCRIPTION_FAILURE',
  };
}
