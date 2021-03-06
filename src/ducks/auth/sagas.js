import { call, put, takeEvery } from 'redux-saga/effects';
import authTypes from './types';
import authService from './service';
import authActions from './actions';
import { push } from 'connected-react-router';

function* authenticateSaga({ data }) {
  try {
    const response = yield call(authService.login, data);
    yield put(authActions.loginSuccess(response));
  } catch (error) {
    yield put(authActions.loginFailure(error));
  }
}

function* onboardingSaga({ data }) {
  try {
    const response = yield call(authService.onboarding, data);

    yield put(
      authActions.onboardingSuccess({
        ...response.data,
        completedOnboarding: true,
      }),
    );

    yield put(push('/trace'));
  } catch (error) {
    yield put(authActions.onboardingFailure(error));
  }
}

export function* authSaga() {
  yield takeEvery(authTypes.login.REQUEST, authenticateSaga);
  yield takeEvery(authTypes.onboarding.REQUEST, onboardingSaga);
}
