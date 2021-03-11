const contactButton = document.getElementById("contact_button");
const sendButton = document.getElementById("contact_form_send");
const form = document.getElementById("contact_form");
const mailArea = document.getElementById("mail");
const topicArea = document.getElementById("topic");
const bodyArea = document.getElementById("body");
var formVisible = false;

contactButton.onclick = function (){
    if(formVisible){
        hideForm();
    }else{
        showForm();
    }
}

sendButton.onclick = function () {
    sendMail(
            mailArea.value,
            topicArea.value,
            bodyArea.value,
    );
}

function sendMail(email, topic, body) {
    var link = "mailto:quentin.cmpn@gmail.com"
                + "?cc="+ encodeURIComponent(email)
                + "&subject=" + encodeURIComponent(topic)
                + "&body=" + encodeURIComponent(body)
    ;
    window.location.href = link;
}

function showForm(){
    form.style.visibility = "visible";
    formVisible = true;
}

function hideForm(){
    form.style.visibility = "hidden";
    formVisible = false;
}

document.onclick = function(event){
    if(event.target !== form && //element is not the form itself
        formVisible && //form is visible (and so created)
        event.target !== contactButton &&
        !isChildOf(event.target, form)){
        hideForm();
    }
}

function isChildOf(elem, parent){
    return parent.contains(elem);
}
