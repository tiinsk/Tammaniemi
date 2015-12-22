import alt from '../../../alt';
import PostActions from '../actions/add';

class AddPostStore {
  constructor() {
    this.bindActions(PostActions);
    this.title = '';
    this.content = '';
    this.helpBlock = '';
    this.titleValidationState = '';
    this.contentValidationState = '';
  }

  onAddPostSuccess(successMessage) {
    this.titleValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddPostFail(errorMessage) {
    this.titleValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateTitle(event) {
    this.title = event.target.value;
    this.titleValidationState = '';
    this.helpBlock = '';
  }

  onUpdateContent(event) {
    this.content = event.target.value;
    this.contentValidationState = '';
  }

  onInvalidTitle() {
    this.titleValidationState = 'has-error';
    this.helpBlock = 'Please enter title.';
  }

  onInvalidContent() {
    this.contentValidationState = 'has-error';
    this.helpBlock = 'Please enter content.';
  }

}

export default alt.createStore(AddPostStore);