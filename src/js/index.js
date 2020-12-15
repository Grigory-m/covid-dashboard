import '../scss/style.scss';
import Covid from './components/covid';

const covid = new Covid({cases: 'Confirmed', total: true, abs: true});
covid.init();
