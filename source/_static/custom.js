const template = document.querySelector('#wiki-template')
const initialText = template.textContent

const tip = tippy('a[href*="wikipedia.org"]', {
  animation: 'shift-toward',
  arrow: true,
  maxWidth: '300px',
  theme: 'light',
  html: '#wiki-template',
  onShow(instance) {

    const wikiPage = instance.reference.href.split("wikipedia.org/wiki")[1].substring(1);

    // `this` inside callbacks refers to the popper element
    const content = this.querySelector('.tippy-content')

    if (tip.loading || content.innerHTML !== initialText) return

    tip.loading = true

    fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&redirects=true&exintro=&titles='+wikiPage).then((resp) => resp.json()).then(data => {
        const pageKey = Object.keys(data.query.pages)[0];
        const firstPara = $.parseHTML(data.query.pages[pageKey].extract)[0].innerHTML
        if(firstPara.split(" ").length > 48) {
          content.innerHTML = '<div style="padding:5px">' + firstPara.split(" ").splice(0,48).join(" ").replace(/,\s*$/, "")  + '...</div>'
        } else {
          content.innerHTML = '<div style="padding:5px">' + firstPara + '</div>'
        }
        tip.loading = false
    }).catch(e => {
        content.innerHTML = 'Loading failed'
        tip.loading = false
    })
  },
  onHidden() {
    const content = this.querySelector('.tippy-content')
    content.innerHTML = initialText
  },
  // prevent tooltip from displaying over button
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      },
      hide: {
        enabled: false
      }
    }
  }
})