import '../scss/style.scss';
import Covid from './components/covid';
import Keyboard from './components/keyboard';

const covid = new Covid({cases: 'Confirmed', period: 'all time', value: 'abs'});
const keyboard = new Keyboard();
covid.init();
keyboard.init();
