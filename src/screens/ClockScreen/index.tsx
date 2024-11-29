/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text/Text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamsList } from '../../routes/AppStack';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Calendar } from './components/Calendar';
import { differenceInSeconds } from 'date-fns';
import { ClockCounter } from './components/ClockCounter';
import { Divider } from './components/Divider';
import { ClocksList } from './components/ClocksList';
import { ClockControl } from './components/ClockControl';
import { useUser } from '../../hooks/useAuth';
import { useIsFocused } from '@react-navigation/native';
import { getCurrentDate } from '../../utils/getCurrentDate';
import { Clock } from '../../types/Clock';
import { getCollaboratorDoc } from '../../utils/firebase/getCollaboratorDoc';
import { getCurrentRunningClock } from '../../utils/firebase/getCurrentRunningClock';
import { convertSecondsToHMS } from '../../utils/convertSecondsToHMS';
import { getAllCurrentDayClocks } from '../../utils/firebase/getAllCurrentDayClocks';
import { getAllCurrentMonthClocks } from '../../utils/firebase/getAllCurrentMonthClocks';

export function ClockScreen({route}:  NativeStackScreenProps<AppStackParamsList, 'ClockScreen'>) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentCounter, setCurrentCounter] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout>();
  const [currentDate, setCurrentDate] = React.useState(getCurrentDate());
  const [clocks, setClocks] = React.useState<Clock[]>([]);
  const [allSecondsOfTheDay, setAllSecondsOfTheDay] = React.useState(0);
  const [allSecondsOfTheMonth, setAllSecondsOfTheMonth] = React.useState(0);

  const {user} = useUser();
  const isFocused = useIsFocused();

  const collaboratorId = route.params ? route.params.collaboratorId : user?.id!;

  const getClocks = React.useCallback(async () => {
    try {
      const allCurrentDayClocks = await getAllCurrentDayClocks(collaboratorId, currentDate);

      allCurrentDayClocks.docs.map(async doc => {
        const clockData = doc.data();

        setClocks(prevState => {
          if (prevState.find(clock => clock.id === doc.id)) {
            return prevState;
          }

          return [...prevState, {
          duration: clockData.duration,
          end: clockData.end.toDate(),
          id: doc.id,
          start: clockData.start.toDate(),
        } as Clock];});
      });
    } catch (error) {
      setClocks([]);
    }
  }, [collaboratorId, currentDate]);

  const getSecondsOfDay = async (date: Date) => {
    const allCurrentDayClocks = await getAllCurrentDayClocks(collaboratorId, date);

    let totalSeconds = 0;

    await Promise.all(allCurrentDayClocks.docs.map(async doc => {
      const clockData = doc.data();

      totalSeconds += clockData.duration;
    }));

    setAllSecondsOfTheDay(totalSeconds);
    return totalSeconds;
  };

  const getSecondsOfMonth = async () => {
    const date = getCurrentDate();
    const allCurrentDayClocks = await getAllCurrentMonthClocks(collaboratorId, date);

    let totalSeconds = 0;

    await Promise.all(allCurrentDayClocks.docs.map(async doc => {
      const clockData = doc.data();

      totalSeconds += clockData.duration;
    }));

    setAllSecondsOfTheMonth(totalSeconds);
    return totalSeconds;
  };

  const defInterval = React.useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      setCurrentCounter((prevInterval) => prevInterval + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  }, []);

  const handleTogglePlay = async () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      defInterval();

      const currentDate = getCurrentDate();
      await firestore().collection('collaborators').doc(collaboratorId).collection('clocks').add({
        start: currentDate,
        end: null,
        duration: null,
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        year: currentDate.getFullYear(),
      }
      );
    } else {
      getCurrentRunningClock(collaboratorId).then((querySnapshot) => {
        const docs = querySnapshot.docs;

        if (docs[0]) {
          const clock = docs[0];
          clock.ref.update({
            end: getCurrentDate(),
            duration: differenceInSeconds(getCurrentDate(), clock.data().start.toDate()),
          });
        }
      }).finally(() => {
        clearInterval(intervalId);
        setCurrentCounter(0);
        getClocks();
        getSecondsOfDay(currentDate);
      });
    }
  };

  React.useEffect(() => {
    getCollaboratorDoc(collaboratorId);
  }, [collaboratorId]);

  React.useEffect(() => {

    if (isFocused) {
      getClocks();
      getCurrentRunningClock(collaboratorId).then((querySnapshot) => {
        const docs = querySnapshot.docs;

        if (docs[0]) {
          setIsPlaying(true);
          const clock = docs[0].data() as FirebaseFirestoreTypes.DocumentData;
          const start = clock.start.toDate();
          const now = getCurrentDate();

          setCurrentCounter(differenceInSeconds(now, start));
          defInterval();
        } else if (!docs.length) {
          setIsPlaying(false);
          setCurrentCounter(0);
        }
      });
      getSecondsOfDay(currentDate);
      getSecondsOfMonth();
    }
  }, [isFocused, collaboratorId]);

  React.useEffect(() => {
    setClocks([]);
    getClocks();
  },[currentDate]);

  if (!collaboratorId) {return null;}

  return (
    <Screen>
      <Calendar currentDate={currentDate} onChangeDate={(newDate) => {
        setCurrentDate(newDate);
        getSecondsOfDay(newDate);
      }} />
      <ClockCounter counter={currentCounter} />
      <Text>Total do dia: {convertSecondsToHMS(allSecondsOfTheDay)}</Text>
      <Text>Total do mês: {convertSecondsToHMS(allSecondsOfTheMonth)}</Text>
      <Divider />
      <ClocksList clocks={clocks} />
      {!user?.isCompany && (
        <ClockControl isPlaying={isPlaying} onToggle={handleTogglePlay} />
      )}
    </Screen>
 );
}
