/**
 * @author Andrei-Robert Rusu
 * @author_website www.easy-development.com
 * @type {{settings: {modal_id: string}, ShowErrors: Function, Modal: Function, GetModalObject: Function, ModalClose: Function}}
 */
LayoutHelperPopup = {

    settings : {
        modal_id : 'simple-modal'
    },

    ShowErrors : function(errors){
        var html = '<div>';

        if(typeof errors == "string")
          html += '<p class="alert alert-error">' + errors + '</p>';
        else if(typeof errors == Array || typeof errors == "object")
          $.each(errors,function(index, error){
            html += '<p class="alert alert-error">' + error + '</p>'
          });

        html += '</div>';

        this.Modal('Error', html);
    },

    Modal : function(title, content, footer, after_load, large_popup) {
        var currentClass = this;

        if($('#' + currentClass.settings.modal_id).length > 0) {
            $('#' + currentClass.settings.modal_id).on('hidden', function () {
              currentClass.Modal(title, content, footer, after_load, large_popup);
            }).modal('hide');

            return false;
        }

        footer = typeof footer == "undefined"
                  || footer == true ? '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>' : footer;


        var html = '<div id="' + currentClass.settings.modal_id + '" ' +
                        'class="modal hide fade" ' +
                        'tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';

        html += '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>' +
                    '<h3 id="myModalLabel">' + title + '</h3>' +
                '</div>';

        if(footer == false)
            html += content;
        else
            html += '<div class="modal-body">' + content + '</div>'
                 +  '<div class="modal-footer">' + footer + '</div>';

        html += '</div>';

        $('body').append(html);

        var theModal = $('#' + currentClass.settings.modal_id);

        theModal.on('hidden', function () {
            $('#' + currentClass.settings.modal_id).remove();
        });

        if(large_popup == true) {
            theModal.modal('show').css({
                'width': function () {
                    return ($(document).width() * .9) + 'px';
                },
                'margin-left': function () {
                    return -($(this).width() / 2);
                }
            });
        } else if(parseInt(large_popup) != 0) {
            theModal.modal('show').css({
                'width': function () {
                    return large_popup;
                },
                'margin-left': function () {
                    return -($(this).width() / 2);
                }
            });
        } else {
            theModal.modal('show');
        }

        if(typeof after_load !== "undefined" && after_load != false)
            eval(after_load + '();');
    },

    GetModalObject : function() {
        return $('#' + this.settings.modal_id);
    },

    ModalClose : function() {
        $('#' + this.settings.modal_id).modal('hide');
    }

};
