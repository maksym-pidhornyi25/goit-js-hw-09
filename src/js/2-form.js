let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

loadData();

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    formData = parsed;

    emailInput.value = parsed.email ?? '';
    messageInput.value = parsed.message ?? '';
  } catch {
    console.warn('Error parsing saved form data');
  }
}

form.addEventListener('input', event => {
  const field = event.target.name;

  if (!field) return;

  formData[field] = event.target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);

  formData = { email: '', message: '' };

  form.reset();
});
