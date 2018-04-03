( ( global ) => {
	function checkboxMaster( options = {} ) {
		// DO SETTINGS
		let settings = {};

		settings.selector = !!options.selector ? options.selector : 'input[type="checkbox"][data-checkbox-master]';
		settings.exclude = !!options.exclude ? options.exclude : '[data-checkbox-exclude]';
		settings.ancestorSelector = !!options.ancestorSelector ? options.ancestorSelector : 'fieldset';

		// DECLARE VARS
		let checkboxElems = document.querySelectorAll( settings.selector );

		// INIT
		if ( checkboxElems.length ) {
			[ ...checkboxElems ].forEach( ( elem )  => {
				elem.addEventListener( 'change', ( e ) => {
					if ( e.target.checked ) {
						let ancestorElem;
						let siblingElems;

						// GET ANCESTOR OF TARGET.
						do {
							ancestorElem = !ancestorElem ? e.target.parentNode : ancestorElem.parentNode;
						} while ( ancestorElem && !ancestorElem.matches( settings.ancestorSelector ) );

						// IF AN ANCESTOR IS FOUND, QUERY IT FOR ALL THE CHECKBOXES.
						if ( ancestorElem ) {
							siblingElems = ancestorElem.querySelectorAll( 'input[type="checkbox"]' );
							siblingElems = siblingElems.length ? [ ...siblingElems ] : [];

							// GET CHECKBOXES WHICH:
							// - ARE CHECKED
							// - ARE NOT THE CURRENT TARGET
							// - ARE NOT EXEMPT
							// SET MATCHED CHECKBOXES TO `checked="false"`
							siblingElems.filter( ( elem ) => {
								return ( elem.checked && elem !== e.target && !elem.matches( settings.exclude ) );
							} )
							.forEach( ( elem ) => {
								elem.checked = false;
							} );
						}
					}
				} );
			} );
		}
	}

	// PUBLIC API
	global.checkboxMaster = checkboxMaster;
} )( window || {} );
