export default class Keyboard {
  constructor() {
    this.input = null;

    this.elements = {
      main: null,
      keysContainer: null,
      keys: [],
    };

    this.eventHandlers = {
      oninput: null,
      onclose: null,
    };

    this.properties = {
      open: false,
      leftString: '',
      rightString: '',
      value: '',
      capsLock: false,
      shift: false,
      lang: 'en',
      cursorPos: 0,
      audio: false,
      speech: false,
      recognition: null,
    };

    this.enKeys = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'audio',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'done',
      'lang', ' ', 'speech', 'ArrowLeft', 'ArrowRight',
    ];

    this.enShiftKeys = [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', 'Backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'audio',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'done',
      'lang', ' ', 'speech', 'ArrowLeft', 'ArrowRight',
    ];

    this.rusKeys = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'audio',
      'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'done',
      'lang', ' ', 'speech', 'ArrowLeft', 'ArrowRight',
    ];

    this.rusShiftKeys = [
      'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'audio',
      'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'done',
      'lang', ' ', 'speech', 'ArrowLeft', 'ArrowRight',
    ];
  }

  init() {
    const keyboardButton = document.querySelector('.form-keyboard');
    const form = document.querySelector('.form-inline');
    this.input = document.querySelector('input');

    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.append(this.elements.keysContainer);
    form.append(this.elements.main);

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);

    this.input.addEventListener('click', () => {
      this.properties.cursorPos = this.input.selectionStart;
      this.properties.leftString = this.properties.value.slice(0, this.properties.cursorPos);
      this.properties.rightString = this.properties.value.slice(this.properties.cursorPos);
    });

    this.elements.keys.forEach((key) => {
      key.addEventListener('click', (e) => {
        const done = e.target.closest('#done');
        if (done) {
          this.close();
          this.triggerEvent('onclose');
        }
        this.input.focus();
        this.properties.open = !this.properties.open;
      });
    });

    keyboardButton.addEventListener('click', () => {      
      if (this.properties.open) {
        this.close();
        this.triggerEvent('onclose');
      } else {
        this.open(this.input.value, (currentValue) => {
          this.input.value = currentValue;          
        });        
      }
      this.input.focus();   
      this.properties.open = !this.properties.open;
    });
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    let keyLayout;

    if (this.properties.lang === 'en' && this.properties.shift) {
      keyLayout = this.enShiftKeys;
    } else if (this.properties.lang === 'en' && !this.properties.shift) {
      keyLayout = this.enKeys;
    } else if (this.properties.lang === 'ru' && this.properties.shift) {
      keyLayout = this.rusShiftKeys;
    } else if (this.properties.lang === 'ru' && !this.properties.shift) {
      keyLayout = this.rusKeys;
    }

    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'audio', 'Enter', 'done'].indexOf(key) !== -1;
      let audio;

      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('data-key', key);
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide', 'control');
          keyElement.innerHTML = createIconHTML('backspace');
          audio = document.querySelector(`audio[data-key="${key}"]`);

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            if (this.properties.cursorPos === 0) return;
            this.properties.cursorPos -= 1;

            this.properties.leftString = this.properties.leftString.slice(0, -1);
            this.properties.value = this.properties.leftString + this.properties.rightString;

            this.triggerEvent('oninput');

            this.input.selectionStart = this.input.selectionEnd;
            this.input.selectionEnd = this.properties.cursorPos;
            this.input.focus();
          });

          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'control');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          audio = document.querySelector(`audio[data-key="${key}"]`);
          if (this.properties.capsLock) keyElement.classList.add('keyboard__key--active');

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
            this.input.focus();
          });

          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--wide', 'control');
          keyElement.innerHTML = createIconHTML('keyboard_return');
          audio = document.querySelector(`audio[data-key="${key}"]`);

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            this.properties.cursorPos += 1;

            this.properties.leftString += '\n';
            this.properties.value = this.properties.leftString + this.properties.rightString;

            this.triggerEvent('oninput');
            this.input.selectionStart = this.input.selectionEnd;
            this.input.selectionEnd = this.properties.cursorPos;
            this.input.focus();
          });

          break;

        case ' ':
          keyElement.classList.add('keyboard__key--extra-wide', 'control');
          keyElement.innerHTML = createIconHTML('space_bar');
          audio = document.querySelector(`audio[data-key="${key}"]`);

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            this.properties.cursorPos += 1;

            this.properties.leftString += ' ';
            this.properties.value = this.properties.leftString + this.properties.rightString;

            this.triggerEvent('oninput');
            this.input.selectionStart = this.input.selectionEnd;
            this.input.selectionEnd = this.properties.cursorPos;
            this.input.focus();
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark', 'control');
          keyElement.id = 'done';
          keyElement.innerHTML = createIconHTML('check_circle');
          audio = document.querySelector(`audio[data-key="${key}"]`);

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            this.close();
            this.triggerEvent('onclose');
          });

          break;

        case 'lang':
          keyElement.classList.add('keyboard__key--wide', 'control');
          keyElement.textContent = `${this.properties.lang}`;
          audio = document.querySelector(`audio[data-key="${key}"]`);

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            this.toggleLang();
            this.input.focus();
          });

          break;

        case 'ArrowLeft':
          keyElement.classList.add('control');
          keyElement.innerHTML = '&#9665';

          keyElement.addEventListener('click', () => {
            if (this.properties.cursorPos === 0) return;
            this.properties.cursorPos -= 1;
            this.input.selectionStart = this.input.selectionEnd;
            this.input.selectionEnd = this.properties.cursorPos;
            this.input.focus();

            this.properties.leftString = this.properties.value.slice(0, this.properties.cursorPos);
            this.properties.rightString = this.properties.value.slice(this.properties.cursorPos);
          });

          break;
        case 'ArrowRight':
          keyElement.classList.add('control');
          keyElement.innerHTML = '&#9655';

          keyElement.addEventListener('click', () => {
            if (this.properties.cursorPos === this.properties.value.lengthnp) return;
            this.properties.cursorPos += 1;
            this.input.selectionStart = this.properties.cursorPos;
            this.input.selectionEnd = this.properties.cursorPos;
            this.input.focus();

            this.properties.leftString = this.properties.value.slice(0, this.properties.cursorPos);
            this.properties.rightString = this.properties.value.slice(this.properties.cursorPos);
          });

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--wide', 'control', 'shift');
          keyElement.textContent = key;
          audio = document.querySelector(`audio[data-key="${key}"]`);
          if (this.properties.shift) keyElement.classList.add('key-active');

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            this.toggleShift();
            document.querySelector('button[data-key="Shift"]').classList.toggle('key-active', this.properties.shift);
            this.input.focus();
          });

          break;
        case 'audio':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'control', 'audio');
          keyElement.innerHTML = createIconHTML('volume_down');
          if (this.properties.audio) keyElement.classList.add('audio__key--active');

          keyElement.addEventListener('click', () => {
            this.toggleAudio();
            keyElement.classList.toggle('audio__key--active', this.properties.audio);
            this.input.focus();
          });

          break;
        case 'speech':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'control', 'audio');
          keyElement.innerHTML = createIconHTML('mic');
          if (this.properties.speech) keyElement.classList.add('speech__key--active');

          keyElement.addEventListener('click', () => {
            if (this.properties.speech) {
              keyElement.classList.remove('speech__key--active');
              this.properties.recognition.removeEventListener('end', this.properties.recognition.start);
              this.properties.recognition.abort();
              this.properties.recognition = null;
            } else {
              keyElement.classList.add('speech__key--active');
              this.toggleSpeech();
            }            
            this.properties.speech = !this.properties.speech;
          });

          break;

        default:

          keyElement.textContent = key.toLowerCase();
          keyElement.setAttribute('data-audio', 'key');
          if (this.properties.lang === 'en') audio = document.querySelector('audio[data-key="key-en"]');
          if (this.properties.lang === 'ru') audio = document.querySelector('audio[data-key="key-ru"]');

          keyElement.addEventListener('click', () => {
            if (this.properties.audio) audio.play();
            this.properties.cursorPos += 1;

            this.properties.leftString += (this.properties.capsLock && this.properties.shift)
          || (!this.properties.capsLock && !this.properties.shift)
              ? keyElement.textContent.toLowerCase() : keyElement.textContent.toUpperCase();

            this.properties.value = this.properties.leftString + this.properties.rightString;

            this.triggerEvent('oninput');
            this.input.selectionStart = this.input.selectionEnd;
            this.input.selectionEnd = this.properties.cursorPos;
            this.input.focus();
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach((elem) => {
      const key = elem;
      if (key.childElementCount === 0 && !key.classList.contains('control')) {
        if (this.properties.shift) {
          key.textContent = this.properties.capsLock
            ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
        } else {
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    });
  }

  toggleShift() {
    this.properties.shift = !this.properties.shift;
    this.elements.keysContainer.innerHTML = '';
    this.elements.keysContainer.append(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.keys.forEach((elem) => {
      const key = elem;
      if (key.childElementCount === 0 && !key.classList.contains('control')) {
        if (this.properties.capsLock) {
          key.textContent = this.properties.shift
            ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
          document.querySelector('button[data-key="CapsLock"]').classList.add('keyboard__key--active');
        } else {
          key.textContent = this.properties.shift
            ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    });
  }

  toggleLang() {
    this.properties.lang = this.properties.lang === 'en' ? 'ru' : 'en';
    this.elements.keysContainer.innerHTML = '';
    this.elements.keysContainer.append(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.keys.forEach((elem) => {
      const key = elem;
      if (key.childElementCount === 0 && !key.classList.contains('control')) {
        if (this.properties.capsLock) {
          key.textContent = this.properties.shift
            ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
        } else {
          key.textContent = this.properties.shift
            ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    });

    if (this.properties.recognition) {
      this.properties.recognition.abort();
      if (this.properties.lang === 'en') this.properties.recognition.lang = 'en-US';
      if (this.properties.lang === 'ru') this.properties.recognition.lang = 'ru-RU';
    }
  }

  toggleAudio() {
    this.properties.audio = !this.properties.audio;
  }

  toggleSpeech() {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.properties.recognition = new SpeechRecognition();

    this.properties.recognition.interimResults = true;
    if (this.properties.lang === 'en') this.properties.recognition.lang = 'en-US';
    if (this.properties.lang === 'ru') this.properties.recognition.lang = 'ru-RU';

    this.properties.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(' ');

      if (e.results[0].isFinal) {
        this.properties.value += `${transcript} `;
        this.triggerEvent('oninput');
      }
    });

    this.properties.recognition.addEventListener('end', this.properties.recognition.start);
    this.properties.recognition.start();    
  }

  keyDownHandler(e) {
    let key; let index;
    const button = document.querySelector(`button[data-key="${e.key}"]`);

    switch (e.key) {
      case 'Enter':

        button.classList.add('key-active');
        break;
      case 'Backspace':

        button.classList.add('key-active');
        break;
      case ' ':

        button.classList.add('key-active');
        break;
      case 'Shift':

        this.toggleShift();
        button.classList.toggle('key-active', this.properties.shift);
        break;
      case 'CapsLock':

        this.toggleCapsLock();
        button.classList.toggle('keyboard__key--active', this.properties.capsLock);
        break;

      default:
        key = e.key.toLowerCase();
        index = this.enKeys.includes(key) ? this.enKeys.indexOf(key) : this.rusKeys.indexOf(key);
        
        if (index === -1) return;
        this.elements.keys[index].classList.add('key-active');
        break;
    }
  }

  keyUpHandler() {
    this.elements.keys.forEach((key) => {
      if (key.dataset.key !== 'Shift') {
        key.classList.remove('key-active');
      }
    });
  }

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;    
    this.elements.main.classList.remove('keyboard--hidden');
  }

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = null;
    this.eventHandlers.onclose = null;
    this.elements.main.classList.add('keyboard--hidden');
  }
}