function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}

const ObjectElement = {
    DOMElement: function(attr, value){
        let identifier;
        attr.toLowerCase()
        if (attr === "id") {
            identifier = document.getElementById(`${value}`);
        }
        else if(attr === "class") {
            identifier = document.getElementsByClassName(`${value}`)
        }
        else if(attr === "tags") {
            identifier = document.getElementsByTagName(`${value}`)
        }
        return identifier
    },
    
    DOMFunction: function(trackValue, contactValue, quoteValue){
        this.DOMElement("class", "track-form")[0].style.display = trackValue;
        this.DOMElement("class", "contact-form")[0].style.display = contactValue
        this.DOMElement("class", "quote-form")[0].style.display = quoteValue
    }
}

ObjectElement.DOMElement("class", "offers")[0].addEventListener("click", () => {
    ObjectElement.DOMFunction("block", "none", "none")
})

ObjectElement.DOMElement("class", "offers")[1].addEventListener('click', () => {
    ObjectElement.DOMFunction("none", "none", "block")
})

ObjectElement.DOMElement("class", "offers")[2].addEventListener('click', () => {
    ObjectElement.DOMFunction("none", "block", "none")
})/*


    border: 8px solid var(--transparentCover);
    
    ObjectElement.DOMElement("id", "about_intro").addEventListener('mouseover', () => {
        let linkAfter = window.getComputedStyle(ObjectElement.DOMElement("tag", "a")[0], "::after")
    })
    */
