// Although MDN states that Safari supports scroll with smooth it isn't :)
// So we're forced to use polyfill https://github.com/iamdustan/smoothscroll

import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()
