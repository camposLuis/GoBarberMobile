import { Alert } from 'react-native';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import {
  createSubscriptionSuccess,
  createSubscriptionFailure,
  cancelSubscriptionSuccess,
} from './actions';

export function* createSubscription({ payload }) {
  try {
    const profileId = yield select(state => state.user.profile.id);

    const responseSubscriptions = yield call(
      api.get,
      `meetups/${payload.id}/subscriptions`
    );

    const checkSubscription = responseSubscriptions.data.subscriptions.find(
      sub =>
        sub.participant_id === profileId &&
        sub.meetup_id === payload.id &&
        sub.canceled_at === null
    );

    if (checkSubscription) {
      Alert.alert('Aviso', 'Você já possui inscrição neste meetup');
      yield put(createSubscriptionFailure());
    } else {
      yield call(api.post, `subscriptions/${payload.id}`);

      Alert.alert(
        'Inscrição realizada',
        'Sua inscrição foi realizada com sucesso'
      );

      yield put(createSubscriptionSuccess());
    }
  } catch (err) {
    Alert.alert(
      'Falha na inscrição',
      'Verifique se já não possui uma inscrição para a mesma data e horário'
    );
    yield put(createSubscriptionFailure());
  }
}

export function* cancelSubscription({ payload }) {
  try {
    yield call(api.delete, `subscriptions/${payload.id}`);

    Alert.alert('Cancelamento', 'Sua inscrição foi cancelada com sucesso');

    yield put(cancelSubscriptionSuccess());
  } catch (err) {
    Alert.alert(
      'Falha no cancelamento',
      'Houve uma falha ao realizar o cancelamento.'
    );
    yield put(createSubscriptionFailure());
  }
}

export default all([
  takeLatest('@subscription/CREATE_SUBSCRIPTION_REQUEST', createSubscription),
  takeLatest('@subscription/CANCEL_SUBSCRIPTION_REQUEST', cancelSubscription),
]);
