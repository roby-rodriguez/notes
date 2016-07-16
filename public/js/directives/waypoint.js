/**
 * In the original this used to be handled by 'animateBoxWayPoint'
 * but this won't work with angular as it is -> so it must be integrated
 * by means of this directive which basically applies 'waypoint' to each
 * newly created element
 */
angular.module('notesApp')
    .directive('waypoint', function () {
        return {
            link: function (scope, element) {
                $(element).waypoint( function( direction ) {

                    if( direction === 'down' && !$(this).hasClass('animated') ) {
                        $(this.element).addClass('bounceIn animated');
                    }

                } , { offset: '75%' } );
            }
        };
    });
