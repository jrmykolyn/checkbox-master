'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (global) {
	function checkboxMaster() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		// DO SETTINGS
		var settings = {};

		settings.selector = !!options.selector ? options.selector : 'input[type="checkbox"][data-checkbox-master]';
		settings.exclude = !!options.exclude ? options.exclude : '[data-checkbox-exclude]';
		settings.ancestorSelector = !!options.ancestorSelector ? options.ancestorSelector : 'fieldset';

		// DECLARE VARS
		var checkboxElems = document.querySelectorAll(settings.selector);

		// INIT
		if (checkboxElems.length) {
			[].concat(_toConsumableArray(checkboxElems)).forEach(function (elem) {
				elem.addEventListener('change', function (e) {
					if (e.target.checked) {
						var ancestorElem = void 0;
						var siblingElems = void 0;

						// GET ANCESTOR OF TARGET.
						do {
							ancestorElem = !ancestorElem ? e.target.parentNode : ancestorElem.parentNode;
						} while (ancestorElem && !ancestorElem.matches(settings.ancestorSelector));

						// IF AN ANCESTOR IS FOUND, QUERY IT FOR ALL THE CHECKBOXES.
						if (ancestorElem) {
							siblingElems = ancestorElem.querySelectorAll('input[type="checkbox"]');
							siblingElems = siblingElems.length ? [].concat(_toConsumableArray(siblingElems)) : [];

							// GET CHECKBOXES WHICH:
							// - ARE CHECKED
							// - ARE NOT THE CURRENT TARGET
							// - ARE NOT EXEMPT
							// SET MATCHED CHECKBOXES TO `checked="false"`
							siblingElems.filter(function (elem) {
								return elem.checked && elem !== e.target && !elem.matches(settings.exclude);
							}).forEach(function (elem) {
								elem.checked = false;
							});
						}
					}
				});
			});
		}
	}

	// PUBLIC API
	global.checkboxMaster = checkboxMaster;
})(window || {});