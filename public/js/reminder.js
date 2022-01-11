const reminderType = document.querySelector("#reminder-type");
const onceReminderOption = document.querySelector("#once-reminder-option");
const repeatReminderOption = document.querySelector("#repeat-reminder-option");


reminderType.addEventListener('change', () => {
  if(reminderType.value == 'once') {
    onceReminderOption.classList.remove('hidden');
    repeatReminderOption.classList.add('hidden');
  }
  else if(reminderType.value == 'repeat') {
    onceReminderOption.classList.add("hidden");
    repeatReminderOption.classList.remove("hidden");
  }
})


