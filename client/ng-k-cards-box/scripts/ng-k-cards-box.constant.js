/**
 * Created by huanli<klx211@gmail.com> on 1/5/15.
 *
 * Variable prefixes' meanings:
 * -------------------------------------------------------------------------
 * --- The prefix of a variable's name reveals the type of data it holds ---
 * -------------------------------------------------------------------------
 *
 * a: Array
 * b: Boolean
 * d: DOM
 * f: Function
 * l: List(an array-like object)
 * n: Number
 * o: Object
 * r: Regular expression
 * s: String
 * x: More than one type
 *  : Special case or NOT my code
 *
 * *** These prefixes can be concatenated to indicate that the variable can
 *         hold the specified types of data ***
 */

(function () {

    'use strict';

    var kCardsBoxEvents = {
            BEFORE_UNLOAD: 'cardsBoxBeforeUnload',
            BOTTOM_REACHED: 'cardsBoxBottomReached',
            DIALOG_CLOSE: 'cardsBoxDialogClose',
            DIALOG_OPEN: 'cardsBoxDialogOpen',
            LOADED: 'cardsBoxLoaded',
            LOADING: 'cardsBoxLoading'
        },
        kCardsBoxDefaults = {
            COLUMN_COUNT: 3,
            CARD_SPACING: 30,
            CARD_RATIO: 3 // width / height ratio
        };

    angular
        .module('kl.cardsBox')
        .constant('kCardsBoxEvents', kCardsBoxEvents)
        .constant('kCardsBoxDefaults', kCardsBoxDefaults);

}());