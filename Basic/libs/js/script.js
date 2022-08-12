$("#card__form").submit((e) => {
    e.preventDefault();

    if (validateName() && validateEmail() && validateCard()){
        sendMail();
    }
});

const sendMail = () => {

    $.ajax({
        url: "libs/php/sendMail.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#input__name').val(),
            userEmail: $('#input__email').val(),
            card: $('#input__card').val()
        },
        success: function() {
            
            mailSuccess();
        
        },
        error: function() {
            
            $('#contact__formFailMsg').removeClass('hidden');

        }
    })
}

const mailSuccess = () => {

    const inputs = document.querySelectorAll('#input__name, #input__email, #input__card')

    inputs.forEach(input => {
        input.value = '';
    });
}


$("#input__name").focusout(() => {
    let validity = validateName();
    console.log(validity);

    if (validity === true) {
        $("#input__name").addClass('validInput');
        $("#input__name").siblings().addClass('hidden');
    } else {
        $("#input__name").removeClass('validInput');
        $("#input__name").siblings().removeClass('hidden');
    }
})

$("#input__email").focusout(() => {
    let validity = validateEmail();
    console.log(validity);

    if (validity === true) {
        $("#input__email").addClass('validInput');
        $("#input__email").siblings().addClass('hidden');
    } else {
        $("#input__email").removeClass('validInput');
        $("#input__email").siblings().removeClass('hidden');
    }
})

$("#input__card").focusout(() => {
    let cardError = validateCard();

    if (cardError === 'none') {
        $("#input__card").addClass('validInput');
        $("#input__card").siblings().addClass('hidden');
    } else if (cardError === 'regex') {
        $("#input__card").removeClass('validInput');
        $("#card__regexError").removeClass('hidden');
    } else if (cardError === 'luhn') {
        $("#input__card").removeClass('validInput');
        $("#card__LUHNError").removeClass('hidden');
    }
})

const validateName = () => {
    var regex = /^[a-zA-Z\s]+$/;

    return regex.test($("#input__name").val());
}

const validateEmail = () => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return regex.test($("#input__email").val());
}

const validateCard = () => {
    var card = $("#input__card").val();

    if (/[^0-9-\s]+/.test(card)) return 'regex';

    
    var nCheck = 0, nDigit = 0, bEven = false;
    card = card.replace(/\D/g, "");

    for (var n = card.length - 1; n >= 0; n--) {
        var cDigit = card.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    let final = (nCheck % 10) == 0 ? 'none' : 'luhn';
    return final;
}