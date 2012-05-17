// JavaScript Document

jQuery(document).ready(function($) {
	
	
	redraw();
	
	function recount() {
		var structure = [];
		var counter = 0;
		var sections = jQuery('.drupal-section');
		// Count sections
		//jQuery('.drupal-section').each(function(index) {

		for (var i=0; i < sections.length; i++) {
			section = sections[i];
			counter++;
			var classes = jQuery(section).attr('class').split(" ");
			for (var k=0; k < classes.length; k++) {
				cl = classes[k];
				if ((cl == 'drupal-br') && (i > 0)) {
					counter--;
					structure.push(counter);
					counter = 1;
					break;
				}
			}
		}
		structure.push(counter);
		return structure;
	}
	
	// TODO: separate buttons & width
	function rebrand(structure) {
		var sections = jQuery('.drupal-section');
		var passed = 0;
		var width_total = 600;
		var act_btns = '<div class="btn-act-cntn">';
		act_btns += '<input type="button" class="btn-act btn-split" value="|">';
		act_btns += '<input type="button" class="btn-act btn-del" value="X">';
		act_btns += '</div>';
		var border_width = 2+2; // left & rigth
		
		for (var i=0; i < structure.length; i++) {
			for (var k=0; k < structure[i]; k++) {
				jQuery(sections[passed + k]).css('width', ((width_total / structure[i]) - border_width-2)+'px');
				jQuery(sections[passed + k]).attr('id', 'col-'+(k+1)+'-row-'+(i+1));
				jQuery(sections[passed + k]).html(act_btns);
			}
			passed += structure[i];
		}
	}
	
	function redraw() {
		var structure = recount();
		rebrand(structure);
	}
	
	jQuery('.btn-split').click(function($) {
		alert('Split at ' + jQuery(this).parent().parent().attr('id'));
	});
	
	jQuery('.btn-del').click(function($) {
		alert('Bam!');
		jQuery(this).parent().parent().remove();
		redraw();
	});
	
	jQuery('.btn-add').click(function($) {
		jQuery('#drupal-doc').html(jQuery('#drupal-doc').html() + '<div class="drupal-section drupal-br"></div>');
		redraw();
	});
	
	//alert(structure);
});