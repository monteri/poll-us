import errorObserver from '../observers/ErrorObserver';

class PollModel {
  constructor(data) {
    this.data = Object.keys(data).reduce((acc, item) => {
      if (item !== 'answers') {
        acc[item] = data[item];
        return acc;
      }
      acc[item] = data[item].map(answer => answer.value);
      return acc;
    }, {});
  }

  createPollValidate() {
    errorObserver.errors = {};
    const {
      title, type, anotherOption, answers,
    } = this.data;
    if (!title) {
      errorObserver.errors.title = 'Title can not be empty.';
    }
    if (!type) {
      errorObserver.errors.type = 'Select a type.';
    }
    if (!anotherOption && answers.length < 2) {
      errorObserver.errors.common = 'At least 2 answers should be present or another option is active.';
    }
    if (new Set(answers).size !== answers.length) {
      errorObserver.errors.common = 'Duplicated answers are not allowed.';
    }
    if (answers.some(answer => !answer)) {
      errorObserver.errors.common = 'Answer can not be empty.';
    }
    errorObserver.commitChanges();
    return Object.keys(errorObserver.errors).length > 0;
  }
}

export default PollModel;
