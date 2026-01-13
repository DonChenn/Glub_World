class dialogue_manager {
  constructor(dialogue_text_element, dialogues, dialogue_sound) {
    this.dialogue_text_element = dialogue_text_element;
    this.dialogues = dialogues;
    this.dialogue_sound = dialogue_sound;
    this.current_dialogue_index = 0;
    this.is_typing = false;
    this.is_finished = false;
    this.on_complete = null;
    this.typingTimeout = null;
  }

  type_writer(text, on_complete) {
    this.is_typing = true;
    if (this.dialogue_sound) {
      this.dialogue_sound.play();
    }

    let i = 0;
    this.dialogue_text_element.innerHTML = "";

    const typing = () => {
      if (i < text.length) {
        this.dialogue_text_element.innerHTML += text.charAt(i);
        i++;
        this.typingTimeout = setTimeout(typing, 25);
      } else {
        this.is_typing = false;
        if (this.dialogue_sound) {
          this.dialogue_sound.pause();
        }
        if (on_complete) {
          on_complete();
        }
      }
    };
    typing();
  }

  show_next_dialogue() {
    if (this.is_finished) return;

    if (this.is_typing) {
      clearTimeout(this.typingTimeout);
      this.is_typing = false;

      this.dialogue_text_element.innerHTML =
        this.dialogues[this.current_dialogue_index];

      if (this.dialogue_sound) {
        this.dialogue_sound.pause();
      }

      this.current_dialogue_index++;
      if (this.current_dialogue_index >= this.dialogues.length) {
        this.is_finished = true;
        if (this.on_complete) {
          this.on_complete();
        }
      }
      return;
    }

    if (this.current_dialogue_index < this.dialogues.length) {
      this.type_writer(this.dialogues[this.current_dialogue_index], () => {
        this.current_dialogue_index++;
        if (this.current_dialogue_index >= this.dialogues.length) {
          this.is_finished = true;
          if (this.on_complete) {
            this.on_complete();
          }
        }
      });
    }
  }

  start(on_complete) {
    this.on_complete = on_complete;
    this.current_dialogue_index = 0;
    this.is_finished = false;
    this.show_next_dialogue();
  }
}
