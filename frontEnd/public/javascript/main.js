

function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert(`FireBase not configured`);
    }
}
checkSetup();