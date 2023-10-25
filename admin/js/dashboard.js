const DOM = {
    addSection: document.getElementById('add'),
    updateSection: document.getElementById('update'),
    deleteSection: document.getElementById('delete'),
    addBtn: document.getElementById('addBtn'),
    updBtn: document.getElementById('updBtn'),
    delBtn: document.getElementById('delBtn'),
    hamBtn: document.getElementById('hamburger-cnt'),
    span: document.getElementsByTagName('span')[0],
    nav: document.getElementsByTagName('nav')[0],
    styleElement: (DOMElement, attr, value) => {
        DOMElement.style[attr] = value;
    }
}

DOM.addBtn.addEventListener('click', () => {
    DOM.styleElement(DOM.addSection, 'display', 'grid')
    DOM.styleElement(DOM.updateSection, 'display', 'none')
    DOM.styleElement(DOM.deleteSection, 'display', 'none')
    DOM.styleElement(DOM.delBtn, 'background', 'transparent')
    DOM.styleElement(DOM.delBtn, 'color', 'var(--accentColor)')
    DOM.styleElement(DOM.delBtn, 'fontWeight', 'normal')
    DOM.styleElement(DOM.addBtn, 'background', 'var(--accentColor)')
    DOM.styleElement(DOM.addBtn, 'color', 'var(--themeColor)')
    DOM.styleElement(DOM.addBtn, 'fontWeight', 'bolder')
    DOM.styleElement(DOM.updBtn, 'background', 'transparent')
    DOM.styleElement(DOM.updBtn, 'color', 'var(--accentColor)')
    DOM.styleElement(DOM.updBtn, 'fontWeight', 'normal')
})
DOM.updBtn.addEventListener('click', () => {
    DOM.styleElement(DOM.updateSection, 'display', 'grid')
    DOM.styleElement(DOM.addSection, 'display', 'none')
    DOM.styleElement(DOM.deleteSection, 'display', 'none')
    DOM.styleElement(DOM.delBtn, 'background', 'transparent')
    DOM.styleElement(DOM.delBtn, 'color', 'var(--accentColor)')
    DOM.styleElement(DOM.delBtn, 'fontWeight', 'normal')
    DOM.styleElement(DOM.addBtn, 'background', 'transparent')
    DOM.styleElement(DOM.addBtn, 'color', 'var(--accentColor)')
    DOM.styleElement(DOM.addBtn, 'fontWeight', 'normal')
    DOM.styleElement(DOM.updBtn, 'background', 'var(--accentColor)')
    DOM.styleElement(DOM.updBtn, 'color', 'var(--themeColor)')
    DOM.styleElement(DOM.updBtn, 'fontWeight', 'bolder')
})

DOM.delBtn.addEventListener('click', () => {
    DOM.styleElement(DOM.deleteSection, 'display', 'grid')
    DOM.styleElement(DOM.updateSection, 'display', 'none')
    DOM.styleElement(DOM.addSection, 'display', 'none')
    DOM.styleElement(DOM.delBtn, 'background', 'var(--accentColor)')
    DOM.styleElement(DOM.delBtn, 'color', 'var(--themeColor)')
    DOM.styleElement(DOM.delBtn, 'fontWeight', 'bolder')
    DOM.styleElement(DOM.addBtn, 'background', 'transparent')
    DOM.styleElement(DOM.addBtn, 'color', 'var(--accentColor)')
    DOM.styleElement(DOM.addBtn, 'fontWeight', 'normal')
    DOM.styleElement(DOM.updBtn, 'background', 'transparent')
    DOM.styleElement(DOM.updBtn, 'color', 'var(--accentColor)')
    DOM.styleElement(DOM.updBtn, 'fontWeight', 'normal')
})


DOM.hamBtn.addEventListener('click', () => {
    let ham = DOM.hamBtn;
    DOM.styleElement(DOM.nav, 'marginLeft', '0%')
    DOM.styleElement(ham, 'display', 'none')
})

DOM.span.addEventListener('click', () => {
    let ham = DOM.hamBtn;
    DOM.styleElement(DOM.nav, 'marginLeft', '-80%')
   setTimeout(() => {
    DOM.styleElement(ham, 'display', 'block')
   }, 300)
})