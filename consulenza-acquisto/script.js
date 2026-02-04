const banner = document.getElementById('cookie-banner')
const accept = document.getElementById('cookie-accept')
const decline = document.getElementById('cookie-decline')
const status = document.getElementById('form-status')
const form = document.getElementById('contact-form')
const modals = document.querySelectorAll('.modal')
const modalButtons = document.querySelectorAll('[data-modal]')
const closeButtons = document.querySelectorAll('.modal-close')

const setConsent = (value) => {
  localStorage.setItem('cookie-consent', value)
  banner.classList.remove('active')
  if (value === 'accepted') {
    loadAnalytics()
  }
}

const loadAnalytics = () => {
  if (document.getElementById('ga-script')) return
  const script = document.createElement('script')
  script.id = 'ga-script'
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  function gtag(){window.dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true })
}

const storedConsent = localStorage.getItem('cookie-consent')
if (!storedConsent) {
  banner.classList.add('active')
} else if (storedConsent === 'accepted') {
  loadAnalytics()
}

accept.addEventListener('click', () => setConsent('accepted'))
decline.addEventListener('click', () => setConsent('declined'))

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.modal)
    if (target) target.classList.add('active')
  })
})

const closeAllModals = () => {
  modals.forEach((modal) => modal.classList.remove('active'))
}

closeButtons.forEach((button) => {
  button.addEventListener('click', closeAllModals)
})

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeAllModals()
  })
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const privacy = document.getElementById('privacy')
  if (!privacy.checked) {
    status.textContent = 'Devi accettare la privacy per inviare la richiesta.'
    status.style.color = '#b91c1c'
    return
  }
  status.textContent = 'Richiesta inviata. Ti contatteremo entro 24 ore lavorative.'
  status.style.color = '#15803d'
  form.reset()
})
