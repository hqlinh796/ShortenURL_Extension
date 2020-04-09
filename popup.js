$(document).ready(() => {

    $('#create-button').on('click', (e) => {
      e.preventDefault();
      const destination = $('#long-link-input').val();
      if (destination.length < 5)
        return false;
      
      const customLinkInput = $('#custom-link-input').val();
      if ($('#custom-link').prop('checked') && !customLinkInput.length) {
        return false;
      }

        

      let linkRequest = {
        destination,
        domain: { fullName: "rebrand.ly" }
      }
      if (customLinkInput.length) 
        linkRequest.slashtag = customLinkInput;
      
      let requestHeaders = {
        "Content-Type": "application/json",
        "apikey": "aa66a0b8ce6a4149a1f23b0ff0ff70ab"
      }
      
      $.ajax({
        url: "https://api.rebrandly.com/v1/links",
        type: "post",
        data: JSON.stringify(linkRequest),
        headers: requestHeaders,
        dataType: "json",
        success: (link) => {
          //hide input
          $('form').addClass('dis-none');
          $('.result-wrapper').removeClass('dis-none');

          const status = $('#status');
          status.text('Create successfully');
          status.addClass('successful');
          status.removeClass('error');

          $('#url-result').val(link.shortUrl);
        },
        error: (err) => {
          $('form').addClass('dis-none');
          $('.result-wrapper').removeClass('dis-none');
          const status = $('#status');
          status.text('Error - ' + JSON.parse(err.responseText).errors[0].message);
          status.removeClass('successful');
          status.addClass('error');
          
          $('#url-result').val('');
          //alert(err.responseJSON);
        }
        })
    })
})

$(document).ready( () => {
    $('#custom-link').on('click', function() {
        $('#custom-link-input').removeClass('dis-none');
    })
    $('#random-link').on('click', function() {
        $('#custom-link-input').addClass('dis-none');
    })
})

$(document).ready( () => {
  // click on New
  $('#new-button').on('click', () => {
      $('.result-wrapper').addClass('dis-none');
      $('form').removeClass('dis-none');
  })

  //click on Copy
  $('#copy-button').on('click', () => {
    const urlResult = $("#url-result");
    if (urlResult.val() === '')
      return;
    urlResult.prop('disabled', false);
    urlResult.select();
    document.execCommand("copy");
    urlResult.prop('disabled', true);

    //unselect
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }

    const status = $('#status');
    status.text('✓ Copy to clipboard');
})
})