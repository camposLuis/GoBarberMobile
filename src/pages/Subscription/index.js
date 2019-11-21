import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { withNavigationFocus } from 'react-navigation';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupList from '~/components/MeetupList';
import Empty from '~/components/Empty';

import { cancelSubscriptionRequest } from '~/store/modules/subscription/actions';

import {
  Container,
  List,
  Content,
  SubmitButton,
  SubmitButtonEmpty,
  ContentEmpty,
} from './styles';

import api from '~/services/api';

function Subscription({ isFocused }) {
  const loading = useSelector(state => state.subscription.loading);

  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);
  const [refreshEmpty, setRefreshEmpty] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [itemLoading, setItemLoading] = useState();

  async function loadSubscription() {
    const response = await api.get('subscriptions');

    const data = response.data.map(item => {
      return {
        idSub: item.id,
        id: item.meetup.id,
        title: item.meetup.title,
        location: item.meetup.location,
        url: item.meetup.banner.url,
        organizer: item.meetup.organizer.name,
        organizerId: item.meetup.organizer.id,
        dateMeetup: format(
          parseISO(item.meetup.date),
          "dd 'de' MMMM 'de' yyyy', às' H'h'",
          {
            locale: pt,
          }
        ),
      };
    });

    setSubscriptions(data);
    setRefresh(false);
    setRefreshEmpty(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscription();
    } else {
      setSubscriptions([]);
    }
  }, [isFocused, refresh, loading]);

  function handleRefresh() {
    setRefresh(true);
  }

  function handleSubimitCancel(subMeetup) {
    Alert.alert(
      'Cancelamento',
      `Deseja cancelar sua inscrição no evento ${subMeetup.title}`,
      [
        {
          text: 'Sim',
          onPress: () => dispatch(cancelSubscriptionRequest(subMeetup.idSub)),
        },
        { text: 'Não', onPress: () => {}, style: 'cancel' },
      ]
    );
    setItemLoading(subMeetup.idSub);
  }

  function loadRefresh() {
    setRefreshEmpty(true);
    loadSubscription();
  }

  return (
    <Background>
      <Container>
        <Header />
        {subscriptions.length !== 0 ? (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.idSub)}
            renderItem={({ item }) => (
              <Content>
                <MeetupList data={item} />
                <SubmitButton
                  loading={
                    itemLoading && itemLoading === item.idSub ? loading : false
                  }
                  onPress={() => handleSubimitCancel(item)}
                >
                  Cancelar inscrição
                </SubmitButton>
              </Content>
            )}
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        ) : (
          <ContentEmpty>
            <SubmitButtonEmpty
              loading={refreshEmpty}
              onPress={() => loadRefresh()}
            >
              « Atualizar »
            </SubmitButtonEmpty>
            <Empty typeText={false} />
          </ContentEmpty>
        )}
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: ({ tintColor }) => (
    <Text style={{ fontSize: 12, color: tintColor, alignSelf: 'center' }}>
      Inscrições
    </Text>
  ),
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
