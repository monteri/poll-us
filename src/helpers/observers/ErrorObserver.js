class ErrorObserver {
  constructor() {
    this.errors = {};
    this.refreshState = null;
  }

  registerRefresh(func) {
    this.refreshState = func;
  }

  commitChanges() {
    this.refreshState(this.errors);
  }
}

const errorObserver = new ErrorObserver();

export default errorObserver;
