const reminderType = document.querySelector("#reminder-type");
const onceReminderOption = document.querySelector("#once-reminder-option");
const repeatReminderOption = document.querySelector("#repeat-reminder-option");
const reminderTime = document.querySelector("#reminder-time");

reminderType.addEventListener('change', () => {
  if(reminderType.value == 'once') {
    repeatReminderOption.classList.add('hidden');
  }
  else if(reminderType.value == 'repeat') {
    repeatReminderOption.classList.remove("hidden");
  }
})


