import '../scss/style.scss';
import Covid from './components/covid';

const covid = new Covid({cases: 'Confirmed', period: 'all time', value: 'all'});
covid.init();
